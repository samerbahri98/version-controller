import {
  Resolver,
  ResolveProperty,
  Parent,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { RepoService } from './repo.service';
import { Repo } from './entities/repo.entity';
import { Downloadable } from '../downloadable/downloadable.model';
import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUserId } from '../auth/CurrentUserId.decorator';
import { CreateRepoInput } from './dto/create-repo.input';

@Resolver(() => Repo)
export class RepoResolver {
  constructor(private readonly RepoService: RepoService) {}

  @ResolveProperty(() => Downloadable, { name: 'download' })
  async download(@Parent() parent: Repo): Promise<Downloadable> {
    return await this.RepoService.getDownloadable(parent);
  }

  @Mutation(() => Repo)
  @UseGuards(JwtAuthGuard)
  async createRepository(
    @CurrentUserId() user_id: string,
    @Args('repository_name') repository_name: string,
  ): Promise<Repo> {
    return this.RepoService.create({ repository_name }, user_id);
  }
}
