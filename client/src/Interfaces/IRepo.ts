import { IUser } from "./IUser";

export interface IRepo {
  repository_id: string;
  repository_name: string;
  created_by: IUser;
  created_at?: Date;
}
