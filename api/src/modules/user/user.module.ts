import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserResolver } from './user.resolver';
import { PublicKeyModule } from '../public-key/public-key.module';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepoModule } from '../repo/repo.module';
import { GitServerModule } from '../git-server/git-server.module';
import { UserDbService } from './services/user-db/user-db.service';
import { UserGitService } from './services/user-git/user-git.service';

@Module({
  providers: [UserResolver, UserService, UserDbService,UserGitService],
  imports: [
    PublicKeyModule,
    forwardRef(() => RepoModule),
    TypeOrmModule.forFeature([User]),
    GitServerModule,
  ],
  exports: [UserService],
})
export class UserModule {}
