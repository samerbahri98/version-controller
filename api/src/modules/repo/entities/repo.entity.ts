import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IRepo } from '../repo.interface';
import { User } from 'src/modules/user/entities/user.entity';
import { Commit } from 'src/modules/commit/commit.model';


@ObjectType()
@Entity({ name: 'repositories' })
export class Repo extends BaseEntity implements IRepo {

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  repository_id!: string;

  @Field()
  @Column()
  repository_name!: string;

  @Field(() => User)
  @ManyToOne((type) => User, (created_by) => created_by.repositories)
  @JoinColumn({ name: 'created_by', referencedColumnName: 'user_id' })
  created_by!: User;
  @RelationId((repo: Repo) => repo.created_by)
  @Column({ name: 'created_by' })
  created_by_id!: string;

  @Field()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @Field(()=>Commit)
  masterHeadCommit: Commit;


  @Field(()=>[String])
  branches: string[];

  @Field(()=>[Commit])
  masterCommits: Commit[];
}
