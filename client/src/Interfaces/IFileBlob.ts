import IBranch from "./IBranch";

export default interface IFileBlob {
	branch: IBranch;
	path: string;
	name: string;
	content: string;
}

export interface IFileBlobQueryFields {
	repository_id: string;
	path: string;
	branch_name: string;
}

export interface IFileBlobQueryResponse {
	findFileByBranch: IFileBlob;
}
