import {
  Resolver,
  ResolveProperty,
  Parent,
  Mutation,
  Args,
  Query
} from '@nestjs/graphql';
import { RepoService } from './services/repo.service';
import { Repo } from './entities/repo.entity';
import { Downloadable } from '../downloadable/downloadable.model';
import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUserId } from '../auth/CurrentUserId.decorator';
import { CreateRepoInput } from './dto/create-repo.input';
import { CommitService } from '../commit/commit.service';
import { Commit } from '../commit/commit.model';
import { BranchService } from '../branch/branch.service';

@Resolver(() => Repo)
export class RepoResolver {
  constructor(
    @Inject(forwardRef(() => RepoService))
    private readonly RepoService: RepoService,
    @Inject(forwardRef(() => CommitService))
    private readonly commitService: CommitService,
    @Inject(forwardRef(() => BranchService))
    private readonly branchService: BranchService,
  ) {}

  //Downloadable
  @ResolveProperty(() => Downloadable, { name: 'download' })
  async download(@Parent() parent: Repo): Promise<Downloadable> {
    return await this.RepoService.getDownloadable(parent);
  }

  //masterHeadCommit
  @ResolveProperty(() => Commit, { name: 'masterHeadCommit' })
  async masterHeadCommit(@Parent() parent: Repo): Promise<Commit> {
    return this.commitService.findMasterHead(
      parent.created_by_id,
      parent.repository_id,
    );
  }

  //Branches
  @ResolveProperty(() => [String], { name: 'branches' })
  async branches(@Parent() parent: Repo): Promise<string[]> {
    return this.branchService.findAllNames(
      parent.created_by_id,
      parent.repository_id,
    );
  }

  @ResolveProperty(() => [Commit], { name: 'masterCommits' })
  async masterCommits(@Parent() parent: Repo): Promise<Commit[]> {
    return this.commitService.findAll(
      parent.created_by_id,
      parent.repository_id,
      'master',
    );
  }
  @Mutation(() => Repo)
  @UseGuards(JwtAuthGuard)
  async createRepository(
    @CurrentUserId() user_id: string,
    @Args('repository_name') repository_name: string,
  ): Promise<Repo> {
    return this.RepoService.create({ repository_name }, user_id);
  }

  @Query(()=>Repo)
  async findRepo(@Args('repository_id') repository_id: string): Promise<Repo> {
    return await this.RepoService.findOne(repository_id);
  }
}
