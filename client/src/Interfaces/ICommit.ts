import { IRepo } from "./IRepo";
import ITree from "./ITree";

export default interface ICommit {
	repo: IRepo;
	hash: string;
	hashAbbv: string;
	treeHash: string;
	treeHashAbbv: string;
	parentHash: string;
	parentHashAbbv: string;
	commitMessage?: string;
	tree: ITree;
	date: Date;
}

export interface ICreateCommitResponse {
	createCommit: ICommit;
}

export interface ICreateCommitFields {
	repository_id: string;
	branch: string;
	path: string;
	name: string;
	content: string;
	commit_message: string;
}
