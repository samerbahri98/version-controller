import {
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
	first_name!: string;

	@Field()
	last_name!: string;

	@Field()
	username!: string;

	@Field()
	email!: string;

	@Field()
	password!: string;

	@Field()
	phone!: string;
}

@Resolver(User)
export class RegisterResolver {
	@Query(() => String)
	async login() {
		return "Hello World!";
	}

	@FieldResolver()
	async attribution_tag(@Root() parent: User) {
		return `${parent.username}<${parent.email}>`;
	}

	@Mutation(() => User)
	async register(
		@Args()
		{ first_name, last_name, username, email, password, phone }: RegisterArgs
	): Promise<User> {
		const hashedPassword = await bcrypt.hash(password, 12);
		const user = await User.create({
			first_name,
			last_name,
			email,
			password: hashedPassword,
			username,
			phone
		}).save();

		

		//TODO: Create folder for repositories
		
		return user;
	}
}
