import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../user/entities/user.entity';
import { CreateRepoInput } from '../../dto/create-repo.input';
import { Repo } from '../../entities/repo.entity';

@Injectable()
export class RepoDbService {
  constructor(
    @InjectRepository(Repo)
    private readonly repo: Repository<Repo>,
  ) {}

  async create(user: User, createRepoInput: CreateRepoInput): Promise<Repo> {
    const repoRecord = await this.repo
      .create({
        ...createRepoInput,
        created_by: user,
      })
      .save();
    return repoRecord;
  }

  async findOne(id: string): Promise<Repo> {
    return await this.repo.findOneBy({ repository_id: id });
  }
  
}
