import { InputType, ArgsType, Int, Field } from '@nestjs/graphql';
import {
  IsEmail,
  Length,
  IsString,
  Matches,
  IsMobilePhone,
} from 'class-validator';

@InputType()
@ArgsType()
export class CreateUserInput {
  @Field()
  @Length(1, 250)
  @IsString()
  first_name!: string;

  @Field()
  @Length(1, 250)
  @IsString()
  last_name!: string;

  @Field()
  @Length(1, 250)
  @IsString()
  username!: string;

  @Field()
  @IsEmail()
  @Length(6, 250)
  email!: string;

  @Field()
  @Length(6, 250)
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password!: string;

  //   @Field()
  //   @Length(6, 250)
  //   @IsString()
  //   @Match("password")
  //   passwordConfirmation!: string;

  @Field()
  @IsMobilePhone()
  phone!: string;
}
