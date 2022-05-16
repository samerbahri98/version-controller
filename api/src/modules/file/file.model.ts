import { Field, ObjectType } from '@nestjs/graphql';
import branchInterface from '../branch/branch.interface';
import Branch from '../branch/branch.model';
import IFileBlob from './file.interface';

@ObjectType()
export default class FileBlob implements IFileBlob {
  @Field(() => Branch)
  branch: Branch;

  @Field()
  path: string;
  @Field()
  name: string;
  @Field()
  content: string;
}
