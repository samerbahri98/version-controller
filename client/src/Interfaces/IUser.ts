import { IPublicKey } from "./IPublicKey";
import { IRepo } from "./IRepo";

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
	repositories?: IRepo[];
	public_keys?: IPublicKey[];
}
