import { Field, ObjectType } from '@nestjs/graphql';
import { Repo } from '../repo/entities/repo.entity';
import { IRepo } from '../repo/repo.interface';
import IBranch from './branch.interface';

@ObjectType()
export default class Branch implements IBranch {
  @Field(()=>Repo)
  repo: Repo;
  @Field()
  name: string;
}
