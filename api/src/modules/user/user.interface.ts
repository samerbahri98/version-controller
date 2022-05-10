import { PublicKey } from "../public-key/entities/public-key.entity";
import { Repo } from "../repo/entities/repo.entity";

export interface IUser {
	user_id: string;
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	password: string;
	created_at: Date;
	attribution_tag: string;
	phone: string;
	repositories: Repo[];
	public_keys: Promise<PublicKey[]>;
}
