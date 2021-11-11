import {
	ArgsType,
	Field,
	Arg,
	FieldResolver,
	Query,
	Resolver,
	ResolverInterface,
	Root,
	UseMiddleware,
	Mutation,
	Ctx,
} from "type-graphql";
import { Repo } from "../../entities/Repo";
import { Length } from "class-validator";
import { User } from "../../entities/User";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { IsAuth } from "../../middlewares/IsAuth";
import { IContext } from "../../interfaces/IContext";

@Resolver((of) => Repo)
export class RepositoryResolver {
	// constructor(
	// 	@InjectRepository(Repo) private readonly repoRepository: Repository<Repo>,
	// 	@InjectRepository(User) private readonly userRepository: Repository<User>
	// ) {}
	@FieldResolver((of) => User)
	async created_by(@Root() parent: Repo) {
		const users = await User.find({
			cache: 1000,
			where: { user_id: parent.created_by_id },
		});
		return users[0];
	}

	@Query(() => Repo)
	async repository(
		@Arg("repository_id", { nullable: false }) repository_id: string
	): Promise<Repo> {
		const repository = await Repo.findOne(repository_id);
		if (!repository) throw new Error("repository doesn't exist");
		return repository;
	}

	@Mutation(() => Repo)
	@UseMiddleware(IsAuth)
	async create_repository(
		@Arg("repository_name", { nullable: false }) repository_name: string,
		@Ctx() { payload }: IContext
	): Promise<Repo> {
		if (!payload) throw new Error("user not logged in")
		const repo = await Repo.create({
			repository_name,
			created_by_id: payload.userId,
		}).save();

		// TODO Add repository in SSH
		return repo;
	}
}
