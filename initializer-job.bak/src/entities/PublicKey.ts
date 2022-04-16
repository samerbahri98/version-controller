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
import { IPublicKey } from "./IPublicKey";
import { User } from "./User";

@Entity({ name: "public_keys" })
export class PublicKey extends BaseEntity implements IPublicKey {
	@PrimaryGeneratedColumn("uuid")
	public_key_id!: string;

	@Column()
	public_key_hash!: string;

	@Column()
	public_key_encryption_type!: string;

	@ManyToOne((type) => User, (created_by) => created_by.public_keys)
	@JoinColumn({ name: "created_by", referencedColumnName: "user_id" })
	created_by!: User;
	@RelationId((pub: PublicKey) => pub.created_by)
	@Column({ name: "created_by" })
	created_by_id!: string;

	@Column()
	created_at!: Date;
}
