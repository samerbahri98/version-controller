import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { BranchModule } from '../branch/branch.module';
import { RepoModule } from '../repo/repo.module';
import { UserModule } from '../user/user.module';
import { TreeResolver } from './tree.resolver';
import { TreeService } from './tree.service';

@Module({
  providers: [TreeResolver, TreeService],
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => RepoModule),
    forwardRef(() => BranchModule),
    forwardRef(() => AuthModule),
  ],
  exports: [TreeResolver, TreeService],
})
export class TreeModule {}
