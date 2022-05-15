import { forwardRef, Module } from '@nestjs/common';
import { RepoService } from './repo.service';
import { RepoResolver } from './repo.resolver';
import { DownloadableModule } from '../downloadable/downloadable.module';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repo } from './entities/repo.entity';
import { AuthModule } from '../auth/auth.module';
import { GitServerModule } from '../git-server/git-server.module';

@Module({
  providers: [RepoResolver, RepoService],
  exports: [RepoService],
  imports: [
    DownloadableModule,
    GitServerModule,
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([Repo]),
    forwardRef(() => AuthModule),
  ],
})
export class RepoModule {}
