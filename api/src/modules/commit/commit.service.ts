import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Commit } from './commit.model';
import * as shell from 'shelljs';
import ICommit from './commit.interface';
import ITree from '../tree/tree.interface';
import IBranch from '../branch/branch.interface';
import { RepoService } from '../repo/repo.service';
import { UserService } from '../user/services/user.service';
import { resolve } from 'path';

@Injectable()
export class CommitService {
  constructor(
    @Inject(forwardRef(() => RepoService))
    private readonly repoService: RepoService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}
  async findMasterHead(user_id, repository_id): Promise<Commit> {
      return new Promise(async (resolve,reject)=>{
        const [user, repo] = await Promise.all([
            this.userService.findOne(user_id),
            this.repoService.findOne(repository_id),
          ]);
          const repoDir = `/var/git/.clones/${user.username}/${repo.repository_name}`;
          shell.cd(repoDir).exec('git checkout master');
          const directoryContent = shell
            .exec('git ls-tree --full-tree --name-only -r HEAD')
            .stdout.split('\n');
      
          const files = directoryContent.filter((d) => d&&!d.includes('/'));
          const trees = directoryContent
            .filter((d) => d&&d.includes('/'))
            .map((d) => d.split('/')[0])
            .filter((item, index, array) => array.indexOf(item) === index);
          const log = shell.exec(
            `git log --pretty=format:\"%H - %h - %T - %t - %P - %p - %s - %cd\" ${repoDir} `,
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
            branch,
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
      })
   
  }
}
