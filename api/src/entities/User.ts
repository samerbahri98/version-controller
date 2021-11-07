import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { IUser } from "../interfaces/IUser";

@ObjectType()
@Entity()
export class User extends BaseEntity implements IUser {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id?: string;

	@Field()
	@Column()
	firstName?: string;

	@Field()
	@Column()
	lastName?: string;

	@Field()
	@Column()
	userName?: string;

	@Field()
	@Column()
	email?: string;

	@Column()
	password?: string;

	@Field()
	@Column()
	createdAt?: Date;

	@Field()
	attributionTag?: string;

	@Field()
	@Column()
	phone?: string;
}
