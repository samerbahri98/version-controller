import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GitCmdService } from 'src/modules/git-server/git-cmd.service';
import { GitServerService } from 'src/modules/git-server/git-server.service';
import { CreateUserInput } from '../../dto/create-user.input';


@Injectable()
export class UserGitService {
  constructor(
    @Inject(forwardRef(() => GitServerService))
    private readonly gitServerService: GitServerService,
    @Inject(forwardRef(() => GitCmdService))
    private readonly gitCmdService: GitCmdService,
  ) {}
  async create(createUserInput: CreateUserInput): Promise<any> {
    const userDirectory = '/var/git/' + createUserInput.username;
    const userCloneDirectory =  '/var/git/.clones/' + createUserInput.username;

    const userApacheString = `${createUserInput.username}:${createUserInput.password}`
    await this.gitCmdService.createDirectory(userDirectory);
    await this.gitCmdService.changeDirGitGroup(userDirectory);
    await this.gitCmdService.changeDirGitOwn(userDirectory);
    await this.gitCmdService.changeDirGitMod(userDirectory);
    await this.gitCmdService.createDirectory(userCloneDirectory);
    await this.gitCmdService.changeDirGitGroup(userCloneDirectory);
    await this.gitCmdService.changeDirNodeOwn(userCloneDirectory)
    await this.gitCmdService.changeDirGitMod(userCloneDirectory);
    await this.gitCmdService.appendFile(userApacheString,"/var/git/.htpasswd")
    // await this.gitCmdService.restartApacheServer()
    return;
  }
}
