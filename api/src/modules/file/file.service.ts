import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { RepoService } from '../repo/services/repo.service';
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

  repoDir = (username, repository_name) =>
    `/var/git/.clones/${username}/${repository_name}/`;

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
      shell
        .cd(this.repoDir(user.username, repo.repository_name))
        .exec(`git checkout ${branch_name || 'master'}`)
        .exec('git pull');
      const content = shell.cat(this.repoDir(user.username, repo.repository_name) + path);
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
