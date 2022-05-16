import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { RepoService } from '../repo/repo.service';
import { UserService } from '../user/services/user.service';
import * as shell from 'shelljs';
import FileBlob from './file.model';
import IFileBlob from './file.interface';
import Branch from '../branch/branch.model';
import { basename } from 'path';

@Injectable()
export class FileService {
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
  ): Promise<FileBlob> {
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
      const content = shell.cd(repoDir).cat(path);
      const branch = {
        repo,
        name: branch_name || 'master',
      } as Branch;
      const name = basename(path);
      const file: IFileBlob = {
        branch,
        path,
        name,
        content,
      };
      resolve(file as FileBlob);
    });
  }
}
