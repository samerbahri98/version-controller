import { User } from "../entities/User";
import { Commit } from "../models/Commit";
import { Downloadable } from "../models/Downloadable";

export interface IRepo {
  repository_id: string;
  repository_name: string;
  // commits: Commit[];
  download: Downloadable;
  created_by: User;
  created_at?: Date;
}
