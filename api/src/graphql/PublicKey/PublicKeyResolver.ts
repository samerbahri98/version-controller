import { AuthenticationError } from "apollo-server-errors";
import {
	Arg,
	Ctx,
	FieldResolver,
	Mutation,
	Resolver,
	ResolverInterface,
	Root,
	UseMiddleware,
} from "type-graphql";
import { PublicKey } from "../../entities/PublicKey";
import { User } from "../../entities/User";
import { IContext } from "../../interfaces/IContext";
import { IsAuth } from "../../middlewares/IsAuth";
import { Ssh } from "../../services/Ssh";

@Resolver((of) => PublicKey)
export class PublicKeyResolver implements ResolverInterface<PublicKey> {
	@FieldResolver((of) => User)
	async created_by(@Root() parent: PublicKey) {
		const users = await User.find({
			cache: 1000,
			where: { user_id: parent.created_by_id },
		});

		return users[0];
	}

	@Mutation(() => PublicKey)
	@UseMiddleware(IsAuth)
	async revoke_public_key(
		@Arg("public_key_hash", { nullable: false }) public_key_hash: string,
		@Arg("public_key_encryption_type", { nullable: false })
		public_key_encryption_type: string,
		@Ctx() { payload }: IContext
	) {
		if (!payload) throw new AuthenticationError("not authenticated");
		return this.deleteKey(
			public_key_hash,
			public_key_encryption_type,
			payload.userId
		);
	}

	@Mutation(() => PublicKey)
	@UseMiddleware(IsAuth)
	async set_public_key(
		@Arg("public_key_hash", { nullable: false }) public_key_hash: string,
		@Arg("public_key_encryption_type", { nullable: false })
		public_key_encryption_type: string,
		@Ctx() { payload }: IContext
	) {
		if (!payload) throw new Error("user not logged in");
		return this.setKey(
			public_key_hash,
			public_key_encryption_type,
			payload.userId
		);
	}

	async deleteKey(
		public_key_hash: string,
		public_key_encryption_type: string,
		created_by_id: string
	) {
		return new Promise<PublicKey>(async (resolve, reject) => {
			try {
				const deletedPublicKey = await PublicKey.findOne({
					where: {
						public_key_hash,
						public_key_encryption_type,
						created_by_id,
					},
				});

				if (!deletedPublicKey) throw new Error("public key doesn't exist");
				await PublicKey.remove([deletedPublicKey]);

				const iterations = await PublicKey.count({
					where: {
						public_key_hash,
						public_key_encryption_type,
					},
				});
				if (iterations === 0) {
					await Ssh({
						command: "user",
						argument: "revokepublickey",
						password: `"${public_key_hash}"`,
					});
				}
				resolve(deletedPublicKey);
			} catch (err) {
				reject(err);
			}
		});
	}

	async setKey(
		public_key_hash: string,
		public_key_encryption_type: string,
		created_by_id: string
	) {
		return new Promise<PublicKey>(async (resolve, reject) => {
			try {
				const iterations = await PublicKey.count({
					where: {
						public_key_hash,
						public_key_encryption_type,
					},
				});
				if (iterations === 0) {
					await Ssh({
						command: "user",
						argument: "setpublickey",
						password: `"${public_key_hash}"`,
					});
				}

				const createdPublicKey = await PublicKey.create({
					public_key_hash,
					public_key_encryption_type,
					created_by_id,
				}).save();
				resolve(createdPublicKey);
			} catch (err) {
				reject(err);
			}
		});
	}
}
