import ICommit from "./ICommit";
import { IDownloadable } from "./IDownloadable";
import { IUser } from "./IUser";

export interface IRepo {
  repository_id: string;
  repository_name: string;
  created_by: IUser;
  download: IDownloadable;
  created_at: Date;
  masterHeadCommit: ICommit;
  branches: string[];
  masterCommits: ICommit[];
}

export interface IRepoQueryResponse {
  findRepo: IRepo;
}

export interface IRepoQueryFields {
  repository_id: string;
}
