import { PublicKey } from "../entities/PublicKey";
import { Repo } from "../entities/Repo";

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
	repositories?: Repo[];
	public_keys?: PublicKey[];
}
