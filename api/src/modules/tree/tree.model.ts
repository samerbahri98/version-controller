import { Field, ObjectType } from '@nestjs/graphql';
import Branch from '../branch/branch.model';
import ITree from './tree.interface';

@ObjectType()
export default class Tree implements ITree {
  @Field()
  branch: Branch;
  @Field()
  path: string;
  @Field(type=>[String])
  files: string[];
  @Field(type=>[String])
  trees: string[];
}
