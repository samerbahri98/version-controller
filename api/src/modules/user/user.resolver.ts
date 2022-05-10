import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Root,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { UserService } from './services/user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { PublicKeyService } from '../public-key/public-key.service';
import { PublicKey } from '../public-key/entities/public-key.entity';
import { RepoService } from '../repo/repo.service';
import { Repo } from '../repo/entities/repo.entity';
import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUserId } from '../auth/CurrentUserId.decorator';

@Resolver(User)
export class UserResolver {
  constructor(
    @Inject(forwardRef(()=>UserService))private readonly UserService: UserService,
    private readonly PublicKeyService: PublicKeyService,
    @Inject(forwardRef(()=>RepoService)) private readonly RepoService:RepoService
  ) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.UserService.create(createUserInput);
  }

  @Query(() => User, { name: 'currentUser' })
  @UseGuards(JwtAuthGuard)
  async findAll(@CurrentUserId() user_id:string) {
    return this.UserService.findOne(user_id);
  }

  @ResolveProperty(()=>[PublicKey],{name:"public_keys"})
  async public_keys(@Parent() parent: User):Promise<PublicKey[]> {
    return await this.PublicKeyService.findAllByUserId(parent.user_id)
  }

  @ResolveProperty(()=>[Repo],{name:"repositories"})
  async repositories(@Parent() parent: User):Promise<Repo[]> {
    return await this.RepoService.findAllByUserId(parent.user_id)
  }

  @ResolveField()
  async attribution_tag(@Root() parent: User) {
    return `${parent.username}<${parent.email}>`;
  }

  // @Query(() => User, { name: 'user' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.UserService.findOne(id);
  // }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.UserService.update(updateUserInput.id, updateUserInput);
  // }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.UserService.remove(id);
  }
}
