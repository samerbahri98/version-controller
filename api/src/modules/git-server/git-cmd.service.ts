import { Inject, Injectable } from '@nestjs/common';
import { GitServerService } from './git-server.service';
import * as shell from 'shelljs';

@Injectable()
export class GitCmdService {
  constructor() {}

  exec = (array: string[]) => shell.exec(array.join(' '));
  createDirectory = async (dir: string) =>
    await this.exec(['sudo', 'mkdir', dir]);
  createGitRepo = async (dir: string) =>
    await this.exec(['sudo', 'git', 'init', '--bare', dir]);
  cloneGitRepo = async (from: string, to: string) =>
    await this.exec(['sudo', 'git', 'clone', from, to]);
  changeDirGitOwn = async (dir: string) =>
    await this.exec(['sudo', 'chown', '-R', 'git', dir]);
  changeDirNodeOwn = async (dir: string) =>
    await this.exec(['sudo', 'chown', '-R', 'node', dir]);
  changeDirNodeGroup = async (dir: string) =>
    await this.exec(['sudo', 'chgrp', '-R', 'node', dir]);
  safeDirectory = async (dir: string) =>
    await this.exec([
      'git',
      'config',
      '--global',
      '--add',
      'safe.directory',
      dir,
    ]);
  changeDirGitGroup = async (dir: string) =>
    await this.exec(['sudo', 'chgrp', '-R', 'git', dir]);
  changeDirGitMod = async (dir: string) =>
    await this.exec(['sudo', 'chmod', '-R', 'g+swX', dir]);
  restartApacheServer = async () =>
    await this.exec(['sudo', 'service', 'apache2', 'restart']);

  // createHttpUser = async (username: string, password: string, dir: string) =>
  //   await this.exec([
  //     'sudo',
  //     'htpasswd',
  //     '-b',
  //     dir,
  //     `'${username.replace(/'/g, `'\\''`)}'`,
  //     `'${password.replace(/'/g, `'\\''`)}'`,
  //   ]);
  appendFile = async (content: string, dir: string) =>
    await this.exec([
      'echo',
      '"',
      content.replace(/(["'$`\\])/g, '\\$1'),
      '"',
      '|',
      'sudo',
      'tee',
      '-a',
      dir,
    ]);
}
