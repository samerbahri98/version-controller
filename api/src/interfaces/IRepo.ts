import { User } from "../entities/User";

export interface IRepo {
	repository_id: string;
	repository_name: string;
	// created_by_id: string;
	created_by: User;
	created_at?: Date;
}
