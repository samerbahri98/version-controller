import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { RepoService } from '../repo/repo.service';
import { UserService } from '../user/services/user.service';
import Tree from './tree.model';
import * as shell from 'shelljs';
import Branch from '../branch/branch.model';

@Injectable()
export class TreeService {
  constructor(
    @Inject(forwardRef(() => RepoService))
    private readonly repoService: RepoService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}
  async findByBranch(
    repository_id: string,
    user_id: string,
    branch_name: string,
    path: string,
  ): Promise<Tree> {
    return new Promise(async (resolve, reject) => {
      const [user, repo] = await Promise.all([
        this.userService.findOne(user_id),
        this.repoService.findOne(repository_id),
      ]);
      const repoDir = `/var/git/.clones/${user.username}/${repo.repository_name}/`;
      shell
        .cd(repoDir)
        .exec(`git checkout ${branch_name || 'master'}`)
        .exec('git pull');
      const branch = {
        repo,
        name: branch_name || 'master',
      } as Branch;
      const directoryContent = shell
        .cd(repoDir)
        .exec(`git ls-tree --full-tree --name-only -r ${branch_name}`)
        .stdout.split('\n');
      const files = directoryContent
        .filter((d) => d && d.includes(path))
        .map((d) => d.replace(path, ''))
        .filter((d) => d && !d.includes('/'));
      const trees = directoryContent
        .filter((d) => d && d.includes(path))
        .map((d) => d.replace(path, ''))
        .filter((d) => d && d.includes('/'))
        .map((d) => d.split('/')[0])
        .filter((item, index, array) => array.indexOf(item) === index);
      const tree = {
        branch,
        path,
        files,
        trees,
      } as Tree;
      resolve(tree);
    });
  }
}
