import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DockerService } from './docker/docker.service';
import * as Docker from 'dockerode';
import * as fs from 'fs';

@Injectable()
export class GitServerService {
  private readonly container_name = 'git-ssh-server';
  constructor(
    @Inject(DockerService)
    private dockerService: DockerService,
  ) {}

  async exec(Cmd: string[]): Promise<void> {
    const client: Docker = new Docker({
      socketPath: '/var/run/docker.sock',
    });
    const container = client.getContainer('git-ssh-server');
    const exec = await container.exec({
      Cmd,
      AttachStderr: true,
      AttachStdout: true,
      AttachStdin: true,
      Tty: true,
    });
    const stream = await exec.start({ hijack: true, stdin: true });

    await client.modem.demuxStream(stream, process.stdout, process.stderr);
  }
}
