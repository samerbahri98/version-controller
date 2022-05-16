import IBranch from "./IBranch";

export default interface ITree {
	branch: IBranch;
	path: string;
	files: string[];
	trees: string[];
}

export interface ITreeQueryFields {
	repository_id: string;
	path: string;
	branch_name: string;
}

export interface ITreeQueryResponse {
	findTreeByBranch: ITree;
}
