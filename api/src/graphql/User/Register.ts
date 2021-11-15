import {
	Args,
	ArgsType,
	Ctx,
	Field,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	ResolverInterface,
	Root,
	UseMiddleware,
} from "type-graphql";
import { User } from "../../entities/User";
import { Auth } from "../../entities/Auth";
import * as bcrypt from "bcryptjs";
import { IUser } from "../../interfaces/IUser";
import { QueueNode } from "../../services/QueueNode";
import { status } from "../../interfaces/IQueueNode";
import {
	IsEmail,
	Length,
	IsMobilePhone,
	Matches,
	IsString,
} from "class-validator";
import { Match } from "../../config/match.decorator";
import { IsAuth } from "../../middlewares/IsAuth";
import { IContext } from "../../interfaces/IContext";
import { AuthenticationError } from "apollo-server-errors";
import { Ssh } from "../../services/Ssh";

@ArgsType()
class LoginArgs {
	@Field()
	@IsEmail()
	@Length(6, 250)
	email!: string;

	@Field()
	@Length(6, 250)
	@IsString()
	password!: string;
}

@ArgsType()
class RegisterArgs {
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
		message: "password too weak",
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

@Resolver((of) => Auth)
export class RegisterResolver implements ResolverInterface<Auth> {
	@FieldResolver()
	async accessToken(@Root() parent: Auth) {
		return Auth.createAccessToken(parent.user);
	}

	@FieldResolver()
	async refreshToken(@Root() parent: Auth) {
		return Auth.createRefreshToken(parent.user);
	}

	@Query(() => Auth)
	@UseMiddleware(IsAuth)
	async generate_access_token(@Ctx() { payload }: IContext): Promise<Auth> {
		if (!payload) throw new AuthenticationError("not authenticated");
		const id = payload.userId;
		const user = await User.findOneOrFail(id);
		return Auth.create(user);
	}

	@Query(() => Auth)
	async login(@Args() { email, password }: LoginArgs): Promise<Auth> {
		const user = await User.findOne({ where: { email: email } });
		if (!user) throw new Error("user doesn't exit");
		if (!(await bcrypt.compare(password, user.password || "")))
			throw new Error("password is wrong");

		const accessToken = Auth.createAccessToken(user);

		return Auth.create(user);
	}

	@Mutation(() => Auth)
	async register(
		@Args()
		{ first_name, last_name, username, email, password, phone }: RegisterArgs
	): Promise<Auth> {
		const salt = await bcrypt.genSalt(12);
		const hashedPassword = await bcrypt.hash(password, salt);
		const user = await User.create({
			first_name,
			last_name,
			email,
			password: hashedPassword,
			username,
			phone,
		}).save();
		
		await Ssh({
			command: "user",
			argument: "create",
			password,
			username,
		});
		return Auth.create(user);
	}
}
