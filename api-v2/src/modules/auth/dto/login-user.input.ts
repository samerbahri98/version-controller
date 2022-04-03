import { InputType, ArgsType, Int, Field } from '@nestjs/graphql';
import {
	IsEmail,
	Length,
	IsString,
} from "class-validator";

@InputType()
@ArgsType()
export class LoginUserInput {
	@Field()
	@IsEmail()
	@Length(6, 250)
	email!: string;

	@Field()
	@Length(6, 250)
	@IsString()
	password!: string;
}
