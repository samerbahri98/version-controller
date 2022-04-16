import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  ManyToOne,
  JoinColumn,
  RelationId,
} from "typeorm";
import { IRepo } from "./IRepo";
import { User } from "./User";

@Entity({ name: "repositories" })
export class Repo extends BaseEntity implements IRepo {
  @PrimaryGeneratedColumn("uuid")
  repository_id!: string;

  @Column()
  repository_name!: string;


  @ManyToOne((type) => User, (created_by) => created_by.repositories)
  @JoinColumn({ name: "created_by", referencedColumnName: "user_id" })
  created_by!: User;
  @RelationId((repo: Repo) => repo.created_by)
  @Column({ name: "created_by" })
  created_by_id!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

}
