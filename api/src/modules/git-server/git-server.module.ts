import { Module } from '@nestjs/common';
import { GitServerService } from './git-server.service';
import { DockerService } from './docker/docker.service';
import { GitCmdService } from './git-cmd.service';

@Module({
  providers: [GitServerService, DockerService,GitCmdService],
  exports: [GitServerService,GitCmdService]
})
export class GitServerModule {}
