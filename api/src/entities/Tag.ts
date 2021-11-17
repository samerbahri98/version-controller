import { Field, ObjectType } from "type-graphql";
import { ITag } from "../interfaces/ITag";

@ObjectType()
export class Tag implements ITag{
	@Field()
	name!: string;
	@Field()
	message?: string;
    
}
