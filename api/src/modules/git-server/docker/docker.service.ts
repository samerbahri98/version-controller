import { Injectable } from '@nestjs/common';
import * as Docker from 'dockerode';

@Injectable()
export class DockerService {
  private readonly _client: Docker= new Docker({ socketPath: "/var/run/docker.sock" });

  constructor() {}

  public get client():Docker {
    return this._client
  }
}
