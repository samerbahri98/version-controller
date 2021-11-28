import { Repo } from "../entities/Repo";

export interface ICommit {
  commit_hash: string;
  commit_hash_abbreviated: string;
  tree_hash: string;
  tree_hash_abbreviated: string;
  parent_hash?: string;
  parent_hash_abbreviated?: string;
  subject: string;
  timestamp: Date;
  repo: Repo;
}
