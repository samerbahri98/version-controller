import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { IDownloadable } from '../../downloadable/downloadable.interface';
import { Downloadable } from '../../downloadable/downloadable.model';
import { DownloadableService } from '../../downloadable/downloadable.service';
import { GitCmdService } from '../../git-server/git-cmd.service';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/services/user.service';
import { CreateRepoInput } from '../dto/create-repo.input';
import { Repo } from '../entities/repo.entity';
import { RepoDbService } from './repo-db/repo-db.service';
import { RepoGitService } from './repo-git/repo-git.service';

@Injectable()
export class RepoService {
  constructor(
    @Inject(forwardRef(() => DownloadableService))
    private readonly downloadableService: DownloadableService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => RepoGitService))
    private readonly repoGitService: RepoGitService,
    @Inject(forwardRef(() => RepoDbService))
    private readonly repoDbservice: RepoDbService,
  ) {}

  async create(
    createRepoInput: CreateRepoInput,
    user_id: string,
  ): Promise<Repo> {
    const user = await this.userService.findOne(user_id);
    const repo = await Promise.all([this.repoGitService.create(user,createRepoInput),this.repoDbservice.create(user,createRepoInput)])
    return repo[1]
  }

  findAll() {
    return `This action returns all repo`;
  }

  private getRepoDir = (username: string, repo: string) =>
    `/var/git/${username}/${repo}.git`;

  private getRepoDirClone = (username: string, repo: string) =>
    `/var/git/.clones/${username}/${repo}`;

  async findOne(id: string): Promise<Repo> {
    return await this.repoDbservice.findOne(id)
  }

  async findAllByUserId(created_by_id: string) {
    return await Repo.find({ where: { created_by_id } });
  }

  async getDownloadable(repo: Repo): Promise<Downloadable> {
    const user = await this.userService.findOne(repo.created_by_id);
    return this.downloadableService.get(user, repo);
  }

  // update(id: number, updateRepoInput: UpdateRepoInput) {
  //   return `This action updates a #${id} repo`;
  // }

  remove(id: number) {
    return `This action removes a #${id} repo`;
  }
}
