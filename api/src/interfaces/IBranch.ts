export interface IBranch {
	clone_location?: string;
	commit_location?: string;
	current?: boolean;
	diff_location?: string;
	full_name: string;
	head_location?: string;
	timestamp: Date;
	location?: string;
	name: string;
	remote_location?: string[];
	tree_location?: string;
}
