import { Field, InputType } from '@nestjs/graphql';
import IBranch from 'src/modules/branch/branch.interface';
import Branch from 'src/modules/branch/branch.model';
import IFileBlob from 'src/modules/file/file.interface';

@InputType()
export class createCommitInput {
  @Field(() => String)
  branch: string;
  @Field(() => String)
  repository_id: string;
  @Field(() => String)
  path: string;
  @Field(() => String)
  name: string;
  @Field(() => String)
  content: string;
  @Field(() => String)
  commit_message: string;
}
