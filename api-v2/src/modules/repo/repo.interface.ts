import { User } from "../user/entities/user.entity";

export interface IRepo {
    repository_id: string;
    repository_name: string;
    created_by: User;
    created_at: Date;
}
