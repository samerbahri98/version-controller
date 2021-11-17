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
import { User } from "../../entities/User";
import { IsAuth } from "../../middlewares/IsAuth";
import { IContext } from "../../interfaces/IContext";
import { Ssh } from "../../services/Ssh";
import { Git } from "../../services/Git";
import { ITag } from "../../interfaces/ITag";
import { Tag } from "../../entities/Tag";

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

	@FieldResolver((of) => [Tag])
	async tags(@Root() parent: Repo): Promise<Tag[]> {
		const users = await User.find({
			cache: 1000,
			where: { user_id: parent.created_by_id },
		});
		const tags = await Git.addRemote(
			"origin",
			`/var/git/${users[0].username}/${parent.repository_name}.git`
		).tags();
		console.log({ tags });
		const result: Array<Tag> = tags.all.map((tag) => ({
			name: tag,
		}));
		return result;
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
		if (!payload) throw new Error("user not logged in");
		const repo = await Repo.create({
			repository_name,
			created_by_id: payload.userId,
		}).save();
		const user = await User.findOneOrFail(payload.userId);

		// TODO Add repository in SSH
		await Ssh({
			command: "repository",
			argument: "create",
			username: user.username,
			repository: repository_name,
		});

		const tags = await Git.addRemote(
			"origin",
			`/var/git/${user.username}/${repository_name}.git`
		).tags();
		console.log(tags);
		return repo;
	}
}
