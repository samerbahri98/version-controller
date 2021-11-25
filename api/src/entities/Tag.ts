import { Field, ObjectType } from "type-graphql";
import { ITag } from "../interfaces/ITag";
import { User } from "./User";

@ObjectType()
export class Tag implements ITag{
	@Field()
	tagger!: User;
	
	@Field()
	timestamp!: Date;
	@Field()
	name!: string;
	@Field()
	message?: string;
    
}
