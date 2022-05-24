import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User } from '../../../user/entities/user.entity';
import { GitCmdService } from '../../../git-server/git-cmd.service';
import { CreateRepoInput } from '../../dto/create-repo.input';

@Injectable()
export class RepoGitService {
  constructor(
    @Inject(forwardRef(() => GitCmdService))
    private readonly gitCmdService: GitCmdService,
  ) {}
  private getRepoDir = (username: string, repo: string) =>
    `/var/git/${username}/${repo}.git`;

  private getRepoDirClone = (username: string, repo: string) =>
    `.clones/${username}/${repo}`;
  async create(user: User, createRepoInput: CreateRepoInput) {
    const repoDir = this.getRepoDir(
      user.username,
      createRepoInput.repository_name,
    );
    await this.gitCmdService.createGitRepo(repoDir);

    const repoDirClone = this.getRepoDirClone(
      user.username,
      createRepoInput.repository_name,
    );
    await this.gitCmdService.cloneGitRepo(repoDir, repoDirClone);
    await this.gitCmdService.changeDirGitMod(repoDirClone);
    await this.gitCmdService.changeDirNodeGroup(repoDirClone);
    await this.gitCmdService.changeDirNodeOwn(repoDirClone);
    await this.gitCmdService.changeDirGitMod(repoDir);
    await this.gitCmdService.changeDirGitGroup(repoDir);
    await this.gitCmdService.changeDirGitOwn(repoDir);

    return;
  }
}
