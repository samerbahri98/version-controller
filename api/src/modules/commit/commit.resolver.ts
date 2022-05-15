import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { CurrentUserId } from '../auth/CurrentUserId.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Commit } from './commit.model';
import { CommitService } from './commit.service';

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
}