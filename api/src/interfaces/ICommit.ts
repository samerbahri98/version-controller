export interface ICommit {
	name: string;
	message: string;
	timestamp: Date;
	author_name?: string;
	author_email?: string;
}
