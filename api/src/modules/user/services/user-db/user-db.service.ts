import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserInput } from '../../dto/create-user.input';
import { User } from '../../entities/user.entity';

@Injectable()
export class UserDbService {
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
    
      async findOne(options:FindOneOptions): Promise<User> {
        return await this.User.findOneOrFail(options);
      }
    
      async findByUsername(username: string): Promise<User> {
        return await this.User.findOneOrFail({ where: { username } });
      }
    
      async findByEmail(email: string): Promise<User> {
        return await this.User.findOne({ where: { email } });
      }
}
