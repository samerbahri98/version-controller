import { Injectable } from '@nestjs/common';

@Injectable()
export class GitCmdService {
  createDirectory = (dir: string) => ['mkdir', dir];
  changeFileGitOwnershipCmd = (dir: string) => [
    'chown',
    '-R',
    'git',
    dir,
    '&&',
    'chgrp',
    '-R',
    'git',
    dir,
    '&&',
    'chmod',
    '-R',
    '664',
    'git',
    dir,
  ];
}
