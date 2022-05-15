import { Module } from '@nestjs/common';
import { CommitService } from './commit.service';
import { CommitResolver } from './commit.resolver';
import { UserModule } from '../user/user.module';
import { RepoModule } from '../repo/repo.module';
import { AuthModule } from '../auth/auth.module';

@Module({

  providers: [CommitService, CommitResolver],
  imports: [UserModule,RepoModule,AuthModule]
})
export class CommitModule {}
