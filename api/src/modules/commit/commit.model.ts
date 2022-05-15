import { Repo } from '../repo/entities/repo.entity';
import ICommit from './commit.interface';
import { Field, ObjectType } from '@nestjs/graphql';
import Tree from '../tree/tree.model';

@ObjectType()
export class Commit implements ICommit {
  @Field()
  repo: Repo;

  @Field()
  hash: string;

  @Field()
  hashAbbv: string;

  @Field()
  treeHash: string;

  @Field()
  treeHashAbbv: string;

  @Field()
  parentHash: string;

  @Field()
  parentHashAbbv: string;

  @Field()
  commitMessage?: string;

  @Field()
  date: Date;

  @Field()
  tree: Tree;
}
