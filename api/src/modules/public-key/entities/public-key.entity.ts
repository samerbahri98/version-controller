import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { IPublicKey } from '../public-key.interface';

@ObjectType()
@Entity({ name: 'public_keys' })
export class PublicKey extends BaseEntity implements IPublicKey {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public_key_id!: string;

  @Field()
  @Column()
  public_key_hash!: string;

  @Field()
  @Column()
  public_key_encryption_type!: string;

  @Field(() => User)
  @ManyToOne((type) => User, (created_by) => created_by.public_keys)
  @JoinColumn({ name: 'created_by', referencedColumnName: 'user_id' })
  created_by!: User;
  @RelationId((pub: PublicKey) => pub.created_by)
  // @Field()
  @Column({ name: 'created_by' })
  created_by_id!: string;

  @Field()
  @Column()
  created_at!: Date;
}
