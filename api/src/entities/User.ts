import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	OneToMany,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { IUser } from "../interfaces/IUser";
import { Repo } from "./Repo";
import { TypeormLoader } from "type-graphql-dataloader";

@ObjectType()
@Entity({ name: "user_data" })
export class User extends BaseEntity implements IUser {
	@Field(() => ID)
	@PrimaryGeneratedColumn("uuid")
	user_id!: string;

	@Field()
	@Column()
	first_name!: string;

	@Field()
	@Column()
	last_name!: string;

	@Field()
	@Column()
	username!: string;

	@Field()
	@Column()
	email!: string;

	@Column()
	password!: string;

	@Field()
	@Column()
	created_at!: Date;

	@Field()
	attribution_tag!: string;

	@Field()
	@Column()
	phone!: string;

	@Field(() => [Repo])
	@OneToMany(() => Repo, (repository) => repository.created_by)
	@TypeormLoader()
	repositories?: Repo[];
}
