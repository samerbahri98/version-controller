import {
  Resolver,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { RepoService } from './repo.service';
import { Repo } from './entities/repo.entity';
import { Downloadable } from '../downloadable/downloadable.model';
import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@Resolver(() => Repo)
export class RepoResolver {
  constructor(private readonly RepoService: RepoService) {}

  @ResolveProperty(()=>Downloadable,{name:"download"})
  async download(@Parent() parent: Repo):Promise<Downloadable> {
    return await this.RepoService.getDownloadable(parent)
  }
  
  

}
