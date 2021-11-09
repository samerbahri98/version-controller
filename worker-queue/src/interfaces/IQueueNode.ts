export enum status {
	TODO = "TODO",
	DOING = "DOING",
	DONE = "DONE",
	ERROR = "ERROR",
}

export interface flag {
	name: string;
	value: string;
}

export interface IQueueNode {
	node_id: string;
	action?: string;
	flags?: Array<flag>;
	arguments?: string;
	status?: status;
}
