import { Commit } from "../commit/commit.model";
import { User } from "../user/entities/user.entity";

export interface IRepo {
    repository_id: string;
    repository_name: string;
    created_by: User;
    created_at: Date;
    masterHeadCommit: Commit
    branches: string[]
    masterCommits: Commit[]
}
