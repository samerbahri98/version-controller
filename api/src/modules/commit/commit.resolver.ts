import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CurrentUserId } from '../auth/CurrentUserId.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Commit } from './commit.model';
import { CommitService } from './commit.service';
import { createCommitInput } from './dto/create-commit.input';

@Resolver(() => Commit)
export class CommitResolver {
  constructor(
    @Inject(forwardRef(() => CommitService))
    private readonly commitService: CommitService,
  ) {}
  @Query(() => Commit)
  @UseGuards(JwtAuthGuard)
  async findMasterHead(
    @CurrentUserId() user_id: string,
    @Args('repository_id') repository_id: string,
  ): Promise<Commit> {
    return this.commitService.findMasterHead(user_id, repository_id);
  }

  @Mutation(() => Commit)
  @UseGuards(JwtAuthGuard)
  async createCommit(
    @CurrentUserId() user_id: string,
    @Args('createCommitInput') createCommitInput: createCommitInput,
  ): Promise<Commit> {
    return this.commitService.create(user_id, createCommitInput);
  }
}
