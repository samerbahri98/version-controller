import { Module } from '@nestjs/common';
import { GitService } from './services/git/git.service';
import { BashService } from './services/bash/bash.service';

@Module({
  providers: [GitService, BashService]
})
export class ShellModule {}
