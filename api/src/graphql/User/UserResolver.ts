import { AuthenticationError } from "apollo-server-errors";
import { PrivateKey } from "sshpk";

import {
	Arg,
	Ctx,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	ResolverInterface,
	Root,
	UseMiddleware,
} from "type-graphql";
import { PublicKey } from "../../entities/PublicKey";
import { User } from "../../entities/User";
import { IContext } from "../../interfaces/IContext";
import { IsAuth } from "../../middlewares/IsAuth";

@Resolver((of) => User)
export class UserResolver implements ResolverInterface<User> {
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
