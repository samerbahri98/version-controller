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
import { ObjectType, Field, ID } from "type-graphql";
import { IRepo } from "../interfaces/IRepo";
import { User } from "./User";
import { TypeormLoader } from "type-graphql-dataloader";
import { Downloadable } from "../models/Downloadable";
import { Commit } from "../models/Commit";

@ObjectType()
@Entity({ name: "repositories" })
export class Repo extends BaseEntity implements IRepo {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  repository_id!: string;

  @Field()
  @Column()
  repository_name!: string;

  // @Column({ name: "created_by" })
  // created_by_id!: string;

  @Field(() => User)
  @ManyToOne((type) => User, (created_by) => created_by.repositories)
  @JoinColumn({ name: "created_by", referencedColumnName: "user_id" })
  @TypeormLoader()
  created_by!: User;
  @RelationId((repo: Repo) => repo.created_by)
  @Column({ name: "created_by" })
  created_by_id!: string;

  @Field()
  @Column()
  created_at!: Date;

  // @Field((of) => [Commit])
  // commits!: Commit[];

  @Field()
  download!: Downloadable;

  // @Field()
  // files!: File[];
  // @Field(()=>[Tag])
  // tags?: Tag[];
}
