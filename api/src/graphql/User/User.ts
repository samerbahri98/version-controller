import { AuthenticationError } from "apollo-server-errors";
import {
	Ctx,
	FieldResolver,
	Query,
	Resolver,
	Root,
	UseMiddleware,
} from "type-graphql";
import { User } from "../../entities/User";
import { IContext } from "../../interfaces/IContext";
import { IsAuth } from "../../middlewares/IsAuth";

@Resolver(User)
export class UserResolver {
	@FieldResolver()
	async attribution_tag(@Root() parent: User) {
		return `${parent.username}<${parent.email}>`;
	}

	@Query(() => User)
	@UseMiddleware(IsAuth)
	async currentUser(@Ctx() { payload }: IContext): Promise<User> {
		if (!payload) throw new AuthenticationError("not authenticated");
		const id = payload.userId;
		const user = await User.findOneOrFail(id);
		return user;
	}
}
