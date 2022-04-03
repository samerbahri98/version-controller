import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';


import { IUser } from '../user.interface';
import { Repo } from 'src/modules/repo/entities/repo.entity';
import { PublicKey } from 'src/modules/public-key/entities/public-key.entity';

@ObjectType()
@Entity({ name: 'user_data' })
export class User extends BaseEntity implements IUser {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
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
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @Field()
  attribution_tag!: string;

  @Field()
  @Column()
  phone!: string;

  @Field(() => [Repo])
  @OneToMany(() => Repo, (repository) => repository.created_by)
  repositories!: Repo[];

  @Field(() => [PublicKey])
  @OneToMany(() => PublicKey, (publicKey) => publicKey.created_by)
  public_keys!: Promise<PublicKey[]>;
}
