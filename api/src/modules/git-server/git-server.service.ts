import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { DockerService } from './docker/docker.service';
import Docker from 'dockerode';
import * as fs from "fs" 

@Injectable()
export class GitServerService {
  private readonly container_name = 'git-ssh-server';
  constructor(
    @Inject(forwardRef(() => DockerService))
    private dockerService: DockerService,
  ) {}

  private readonly container: Docker.Container =
    this.dockerService.client.getContainer(this.container_name);

  async exec(Cmd:string[]) {
    return new Promise<void>(async (resolve, reject) => {
      const container = this.dockerService.client.getContainer(
        this.container_name,
      );
      const exec = await container.exec({
        Cmd,
        AttachStderr: true,
        AttachStdout: true,
        AttachStdin: true,
        Tty: true,
      });
      const stream = await exec.start({ hijack: true, stdin: true });
      resolve(this.dockerService.client.modem.demuxStream(stream, process.stdout, process.stderr))

    });
  }
}
