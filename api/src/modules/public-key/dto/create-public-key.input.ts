import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePublicKeyInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
