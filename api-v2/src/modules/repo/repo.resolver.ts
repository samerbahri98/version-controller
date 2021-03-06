import {
  Resolver,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { RepoService } from './repo.service';
import { Repo } from './entities/repo.entity';
import { Downloadable } from '../downloadable/downloadable.model';

@Resolver(() => Repo)
export class RepoResolver {
  constructor(private readonly RepoService: RepoService) {}

  @ResolveProperty(()=>Downloadable,{name:"download"})
  async download(@Parent() parent: Repo):Promise<Downloadable> {
    return await this.RepoService.getDownloadable(parent)
  }
  

}
