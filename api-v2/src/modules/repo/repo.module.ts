import { forwardRef, Module } from '@nestjs/common';
import { RepoService } from './repo.service';
import { RepoResolver } from './repo.resolver';
import { DownloadableModule } from '../downloadable/downloadable.module';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repo } from './entities/repo.entity';

@Module({
  providers: [RepoResolver, RepoService],
  exports: [RepoService],
  imports: [
    DownloadableModule,
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([Repo]),
  ],
})
export class RepoModule {}
