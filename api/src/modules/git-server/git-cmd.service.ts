import { Inject, Injectable } from '@nestjs/common';
import { GitServerService } from './git-server.service';

@Injectable()
export class GitCmdService {
  constructor(
    @Inject(GitServerService)
    private readonly gitServerService: GitServerService,
  ) {}

  exec = this.gitServerService.exec;
  createDirectory = async (dir: string) => await this.exec(['mkdir', dir]);
  createGitRepo = async(dir: string) => await this.exec(['git', 'init', '--bare', dir]);
  cloneGitRepo = async(from: string, to: string) =>
  await this.exec(['git', 'clone', from, to]);
  changeDirGitOwn= async(dir: string) =>
  await  this.exec(['chown', '-R', 'git', dir]);
  changeDirGitGroup = async(dir: string) =>await this.exec(['chgrp', '-R', 'git', dir]);
  changeDirGitMod = async(dir: string) =>
   await this.exec(['chmod', '-R', '664', 'git', dir]);
}
