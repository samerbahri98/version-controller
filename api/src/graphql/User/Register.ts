import {
	Arg,
	Args,
	ArgsType,
	Field,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	Root,
} from "type-graphql";
import { User } from "../../entities/User";
import * as bcrypt from "bcryptjs";
import { IUser } from "../../interfaces/IUser";

@ArgsType()
class RegisterArgs implements IUser {
	@Field()
	firstName!: string;

	@Field()
	lastName!: string;

	@Field()
	userName!: string;

	@Field()
	email!: string;

	@Field()
	password!: string;

	@Field()
	createdAt!: Date;

	@Field()
	attributionTag!: string;

	@Field()
	phone!: string;
}

@Resolver(User)
export class RegisterResolver {
	@Query(() => String)
	async hello() {
		return "Hello World!";
	}
	@FieldResolver()
	async attributionTag(@Root() parent: User) {
		return `${parent.userName}<${parent.email}>`;
	}

	@Mutation(() => User)
	async register(
		@Args()
		{
			firstName,
			lastName,
			userName,
			email,
			password,
			phone,
			createdAt,
		}: RegisterArgs
	): Promise<User> {
		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await User.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			userName,
			phone,
			createdAt: Date.toString(),
		}).save();

		return user;
	}
}
