import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GitCmdService } from 'src/modules/git-server/git-cmd.service';
import { GitServerService } from 'src/modules/git-server/git-server.service';
import { CreateUserInput } from '../../dto/create-user.input';

@Injectable()
export class UserGitService {
  constructor(
    @Inject(forwardRef(() => GitServerService))
    private readonly gitServerService: GitServerService,
    @Inject(forwardRef(() => GitCmdService)) private readonly gitCmdService: GitCmdService,
  ) {}
  async create(createUserInput: CreateUserInput): Promise<any> {
    const userDirectory = '/var/git/' + createUserInput.username;
    const Cmd = [
      ...this.gitCmdService.createDirectory(userDirectory),
      // '&&',
      // ...this.gitCmdService.changeFileGitOwnershipCmd(userDirectory),
    ];
    return this.gitServerService.exec(Cmd);
  }
  
}
