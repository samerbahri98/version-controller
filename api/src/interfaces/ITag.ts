import { User } from "../entities/User";

export interface ITag {
	name: string;
	message?: string;
	tagger: User;
    timestamp: Date
    
}
