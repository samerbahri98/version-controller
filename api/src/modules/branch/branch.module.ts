import { forwardRef, Module } from '@nestjs/common';
import { RepoModule } from '../repo/repo.module';
import { BranchService } from './branch.service';
import Branch from './branch.model';
import { UserModule } from '../user/user.module';

@Module({
  providers: [Branch, BranchService],
  imports: [forwardRef(() => RepoModule), forwardRef(() => UserModule)],
  exports: [Branch, BranchService],
})
export class BranchModule {}
