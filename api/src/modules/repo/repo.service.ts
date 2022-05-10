import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDownloadable } from '../downloadable/downloadable.interface';
import { Downloadable } from '../downloadable/downloadable.model';
import { DownloadableService } from '../downloadable/downloadable.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/services/user.service';
import { CreateRepoInput } from './dto/create-repo.input';
import { UpdateRepoInput } from './dto/update-repo.input';
import { Repo } from './entities/repo.entity';

@Injectable()
export class RepoService {
  constructor(
    @Inject(forwardRef(()=>DownloadableService)) private readonly downloadableService: DownloadableService,
    @Inject(forwardRef(()=>UserService)) private readonly userService: UserService,
    // @InjectRepository(Repo) private readonly Repo: Repository<Repo>,
  ) {}

  create(createRepoInput: CreateRepoInput) {
    return 'This action adds a new repo';
  }

  findAll() {
    return `This action returns all repo`;
  }

  async findOne(id: string) {
    return await Repo.findOneBy({ repository_id: id });
  }

  async findAllByUserId(created_by_id: string) {
    return await Repo.find({ where: { created_by_id } });
  }

  async getDownloadable(repo:Repo): Promise<Downloadable> {
    const user = await this.userService.findOne(repo.created_by_id);
    return this.downloadableService.get(user, repo);
  }

  update(id: number, updateRepoInput: UpdateRepoInput) {
    return `This action updates a #${id} repo`;
  }

  remove(id: number) {
    return `This action removes a #${id} repo`;
  }
}
