import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserInput } from '../dto/create-user.input';
import { User } from '../entities/user.entity';
import { UserDbService } from './user-db/user-db.service';
import { UserGitService } from './user-git/user-git.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => UserGitService))
    private readonly userGitService: UserGitService,
    @Inject(forwardRef(() => UserDbService))
    private readonly userDbService: UserDbService,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const value = await Promise.all([
      this.userDbService.create(createUserInput),
      this.userGitService.create(createUserInput),
    ]);
    return value[0];
  }

  async findAll(): Promise<User[]> {
    return await this.userDbService.findAll();
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  findOne(id: string): Promise<User> {
    return this.userDbService.findOne({ where: { user_id: id } });
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userDbService.findOne({ where: { username } });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userDbService.findOne({ where: { email } });
  }
}
