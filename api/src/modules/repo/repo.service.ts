import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDownloadable } from '../downloadable/downloadable.interface';
import { Downloadable } from '../downloadable/downloadable.model';
import { DownloadableService } from '../downloadable/downloadable.service';
import { GitCmdService } from '../git-server/git-cmd.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/services/user.service';
import { CreateRepoInput } from './dto/create-repo.input';
import { Repo } from './entities/repo.entity';

@Injectable()
export class RepoService {
  constructor(
    @Inject(forwardRef(() => DownloadableService))
    private readonly downloadableService: DownloadableService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @InjectRepository(Repo) private readonly repo: Repository<Repo>,
    @Inject(forwardRef(() => GitCmdService))
    private readonly gitCmdService: GitCmdService,
  ) {}

  async create(
    createRepoInput: CreateRepoInput,
    user_id: string,
  ): Promise<Repo> {
    const user = await this.userService.findOne(user_id);
    const repoRecord = await this.repo
      .create({
        ...createRepoInput,
        created_by: user,
      })
      .save();

    const repoDir = this.getRepoDir(user.username, repoRecord.repository_name);
    await this.gitCmdService.createGitRepo(repoDir);
    await this.gitCmdService.changeDirGitGroup(repoDir);
    await this.gitCmdService.changeDirGitOwn(repoDir);
    await this.gitCmdService.changeDirGitMod(repoDir);

    const repoDirClone = this.getRepoDirClone(
      user.username,
      repoRecord.repository_name,
    );
    await this.gitCmdService.cloneGitRepo(repoDir, repoDirClone);
    await this.gitCmdService.changeDirGitGroup(repoDirClone);
    await this.gitCmdService.changeDirGitOwn(repoDirClone);
    await this.gitCmdService.changeDirGitMod(repoDirClone);

    return repoRecord;
  }

  findAll() {
    return `This action returns all repo`;
  }

  private getRepoDir = (username: string, repo: string) =>
    `/var/git/${username}/${repo}.git`;

  private getRepoDirClone = (username: string, repo: string) =>
    `/var/git/.clones/${username}/${repo}`;

  async findOne(id: string) {
    return await Repo.findOneBy({ repository_id: id });
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
