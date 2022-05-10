import { CreatePublicKeyInput } from './create-public-key.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePublicKeyInput extends PartialType(CreatePublicKeyInput) {
  @Field(() => Int)
  id: number;
}
