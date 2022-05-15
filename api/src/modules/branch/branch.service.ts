import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { IRepo } from '../repo/repo.interface';
import * as shell from 'shelljs';
import { RepoService } from '../repo/repo.service';
import { UserService } from '../user/services/user.service';

@Injectable()
export class BranchService {
  constructor(
    @Inject(forwardRef(() => RepoService))
    private readonly repoService: RepoService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async findAllNames(
    user_id: string,
    repository_id: string,
  ): Promise<string[]> {
    return new Promise(async (resolve, reject) => {
      const [user, repo] = await Promise.all([
        this.userService.findOne(user_id),
        this.repoService.findOne(repository_id),
      ]);
      const repoDir = `/var/git/.clones/${user.username}/${repo.repository_name}`;
      shell.cd(repoDir).exec('git checkout master').exec('git pull');
      const branches = shell.exec('git branch -r').stdout.split('\n');
      resolve(
        branches
          .filter((branch) => branch != '')
          .map((branchFullname) => branchFullname.split('/')[1])
          .filter((branch) => !(branch.indexOf('->') >= 0)),
      );
    });
  }
}
