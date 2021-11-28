import { User } from "../entities/User";
import { Commit } from "../models/Commit";

export interface IRepo {
  repository_id: string;
  repository_name: string;
  commits: Commit[];
  created_by: User;
  created_at?: Date;
}
