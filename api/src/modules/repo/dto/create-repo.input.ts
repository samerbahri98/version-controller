import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRepoInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  repository_name: string;
}
