import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublicKey } from '../public-key/entities/public-key.entity';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly User: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    return await this.User.create(createUserInput).save();
  }

  async findAll(): Promise<User[]> {
    return await this.User.find();
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOne(id: string): Promise<User> {
    return await this.User.findOneOrFail({ where: { user_id: id } });
  }

  async findByUsername(username: string): Promise<User> {
    return await this.User.findOneOrFail({ where: { username } });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.User.findOne({ where: { email } });
  }
}
