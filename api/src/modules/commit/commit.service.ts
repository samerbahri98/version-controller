import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Commit } from './commit.model';
import * as shell from 'shelljs';
import ICommit from './commit.interface';
import ITree from '../tree/tree.interface';
import IBranch from '../branch/branch.interface';
import { RepoService } from '../repo/services/repo.service';
import { UserService } from '../user/services/user.service';
import { resolve } from 'path';
import Branch from '../branch/branch.model';
import { createCommitInput } from './dto/create-commit.input';

@Injectable()
export class CommitService {
  constructor(
    @Inject(forwardRef(() => RepoService))
    private readonly repoService: RepoService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  repoDir = (username, repository_name) =>
    `/var/git/.clones/${username}/${repository_name}/`;

  async findMasterHead(user_id, repository_id): Promise<Commit> {
    return new Promise(async (resolve, reject) => {
      const [user, repo] = await Promise.all([
        this.userService.findOne(user_id),
        this.repoService.findOne(repository_id),
      ]);
      const repoDir = `/var/git/.clones/${user.username}/${repo.repository_name}/`;
      shell.cd(repoDir).exec('sudo git pull').exec('sudo git checkout master');
      const directoryContent = shell
        .exec('sudo git ls-tree --full-tree --name-only -r HEAD')
        .stdout.split('\n');

      const files = directoryContent.filter((d) => d && !d.includes('/'));
      const trees = directoryContent
        .filter((d) => d && d.includes('/'))
        .map((d) => d.split('/')[0])
        .filter((item, index, array) => array.indexOf(item) === index);
      const log = shell.exec(
        `sudo git log --pretty=format:\"%H - %h - %T - %t - %P - %p - %s - %cd\" ${repoDir} `,
      ).stdout;
      const [
        hash,
        hashAbbv,
        treeHash,
        treeHashAbbv,
        parentHash,
        parentHashAbbv,
        commitMessage,
        dateLiteral,
      ] = log.split(' - ');
      const branch: IBranch = {
        repo,
        name: 'master',
      };
      const tree: ITree = {
        branch: branch as Branch,
        path: '.',
        files,
        trees,
      };
      const commitParams: ICommit = {
        repo,
        hash,
        hashAbbv,
        treeHash,
        treeHashAbbv,
        parentHash,
        parentHashAbbv,
        commitMessage,
        date: new Date(dateLiteral),
        tree,
      };
      resolve(commitParams as Commit);
    });
  }

  async findAll(
    user_id: string,
    repository_id: string,
    branchName: string,
  ): Promise<Commit[]> {
    return new Promise(async (resolve, reject) => {
      const [user, repo] = await Promise.all([
        this.userService.findOne(user_id),
        this.repoService.findOne(repository_id),
      ]);
      const repoDir = `/var/git/.clones/${user.username}/${repo.repository_name}/`;
      shell
        .cd(repoDir)
        .exec(`sudo git checkout ${branchName}`)
        .exec('sudo git pull');
      const directoryContent = shell
        .exec('sudo git --no-pager ls-tree --full-tree --name-only -r HEAD')
        .stdout.split('\n');

      const files = directoryContent.filter((d) => d && !d.includes('/'));
      const trees = directoryContent
        .filter((d) => d && d.includes('/'))
        .map((d) => d.split('/')[0])
        .filter((item, index, array) => array.indexOf(item) === index);
      const logs = shell
        .exec(
          `sudo git --no-pager log --pretty=format:\"%H - %h - %T - %t - %P - %p - %s - %cd\" ${repoDir} `,
        )
        .stdout.split('\n');
      const commits = logs.map((log) => {
        const [
          hash,
          hashAbbv,
          treeHash,
          treeHashAbbv,
          parentHash,
          parentHashAbbv,
          commitMessage,
          dateLiteral,
        ] = log.split(' - ');
        const branch: IBranch = {
          repo,
          name: 'master',
        };
        const tree: ITree = {
          branch: branch as Branch,
          path: '.',
          files,
          trees,
        };
        const commitParams: ICommit = {
          repo,
          hash,
          hashAbbv,
          treeHash,
          treeHashAbbv,
          parentHash,
          parentHashAbbv,
          commitMessage,
          date: new Date(dateLiteral),
          tree,
        };
        return commitParams as Commit;
      });
      resolve(commits);
    });
  }

  async create(
    user_id: string,
    createCommitInput: createCommitInput,
  ): Promise<Commit> {
    return new Promise<Commit>(async (resolve, reject) => {
      const [user, repo] = await Promise.all([
        this.userService.findOne(user_id),
        this.repoService.findOne(createCommitInput.repository_id),
      ]);
      const filePath = `${this.repoDir(user.username, repo.repository_name)}/${createCommitInput.path}/${createCommitInput.name}`;
      shell
        .cd(this.repoDir(user.username, repo.repository_name))
        .exec(`sudo mkdir -p ${createCommitInput.path}`)
        .exec(`sudo rm -rf ${filePath}`)
        .exec(`sudo touch ${filePath}`)
        .exec(
          `echo "${createCommitInput.content.replace(
            /(["'$`\\])/g,
            '\\$1',
          )}" | sudo tee -a ${filePath}`,
        )
        .exec(`sudo git add .`)
        .exec(`sudo git commit -m "${createCommitInput.commit_message}"`)
        .exec(`sudo git push -u origin ${createCommitInput.branch}`)
        .exec(
          `sudo git log --pretty=format:\"%H - %h - %T - %t - %P - %p - %s - %cd\" ${this.repoDir(
            user.username,
            repo.repository_name,
          )} `,
        ).stdout;
      resolve(
        await this.findMasterHead(user_id, createCommitInput.repository_id),
      );
    });
  }
}
