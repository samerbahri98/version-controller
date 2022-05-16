import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { BranchModule } from '../branch/branch.module';
import { RepoModule } from '../repo/repo.module';
import { UserModule } from '../user/user.module';
import { FileService } from './file.service';
import { FileResolver } from './file.resolver';

@Module({
  providers: [FileService, FileResolver],
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => RepoModule),
    forwardRef(() => BranchModule),
    forwardRef(() => AuthModule),
  ],
  exports: [FileService, FileResolver],
})
export class FileModule {}
