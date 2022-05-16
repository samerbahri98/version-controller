import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { CurrentUserId } from '../auth/CurrentUserId.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import Tree from './tree.model';
import { TreeService } from './tree.service';

@Resolver(()=>Tree)
export class TreeResolver {
  constructor(
    @Inject(forwardRef(() => TreeService))
    private readonly treeService: TreeService,
  ) {}
  @Query(() => Tree)
  @UseGuards(JwtAuthGuard)
  async findTreeByBranch(
    @Args('repository_id') repository_id: string,
    @CurrentUserId() user_id: string,
    @Args('branch_name') branch_name: string="master",
    @Args('path') path: string,
  ): Promise<Tree> {
    return this.treeService.findByBranch(
      repository_id,
      user_id,
      branch_name,
      path,
    );
  }
}
