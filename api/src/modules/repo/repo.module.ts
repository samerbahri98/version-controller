import { forwardRef, Module } from '@nestjs/common';
import { RepoService } from './services/repo.service';
import { RepoResolver } from './repo.resolver';
import { DownloadableModule } from '../downloadable/downloadable.module';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repo } from './entities/repo.entity';
import { AuthModule } from '../auth/auth.module';
import { GitServerModule } from '../git-server/git-server.module';
import { CommitModule } from '../commit/commit.module';
import { BranchModule } from '../branch/branch.module';
import { RepoDbService } from './services/repo-db/repo-db.service';
import { RepoGitService } from './services/repo-git/repo-git.service';

@Module({
  providers: [RepoResolver, RepoService, RepoDbService, RepoGitService],
  exports: [RepoService],
  imports: [
    DownloadableModule,
    GitServerModule,
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([Repo]),
    forwardRef(() => AuthModule),
    forwardRef(() => CommitModule),
    forwardRef(() => BranchModule),
  ],
})
export class RepoModule {}
