import { Injectable } from '@nestjs/common';
import { Repo } from '../repo/entities/repo.entity';
import { User } from '../user/entities/user.entity';
import { IDownloadable } from './downloadable.interface';
import { Downloadable } from './downloadable.model';

interface ICreateDownloadableInput {
  username: string;
  repository_name: string;
}

@Injectable()
export class DownloadableService {
  constructor() {}
  get(user: User, repo: Repo): Downloadable {
    return new Downloadable(repo.repository_name, user.username);
  }
}
