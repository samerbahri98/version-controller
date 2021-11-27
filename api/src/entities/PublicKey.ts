import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	RelationId,
} from "typeorm";
import { IPublicKey } from "../interfaces/IPublicKey";
import { User } from "./User";

@ObjectType()
@Entity({ name: "public_keys" })
export class PublicKey extends BaseEntity implements IPublicKey {
	@Field(() => ID)
	@PrimaryGeneratedColumn("uuid")
	public_key_id!: string;

	@Field()
	@Column()
	public_key_hash!: string;

	@Field()
	@Column()
	public_key_encryption_type!: string;

	@Field(() => User)
	@ManyToOne((type) => User, (created_by) => created_by.public_keys)
	@JoinColumn({ name: "created_by", referencedColumnName: "user_id" })
	@TypeormLoader()
	created_by!: User;
	@RelationId((pub: PublicKey) => pub.created_by)
	@Column({ name: "created_by" })
	created_by_id!: string;

	@Field()
	@Column()
	created_at!: Date;
}
