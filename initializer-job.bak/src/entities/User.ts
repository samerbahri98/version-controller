import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  OneToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { IUser } from "./IUser";
import { Repo } from "./Repo";
import { PublicKey } from "./PublicKey";

@Entity({ name: "user_data" })
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn("uuid")
  user_id!: string;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;


  @Column()
  phone!: string;

  @OneToMany(() => Repo, (repository) => repository.created_by)
  repositories?: Repo[];

  @OneToMany(() => PublicKey, (publicKey) => publicKey.created_by)
  public_keys?: PublicKey[];
}
