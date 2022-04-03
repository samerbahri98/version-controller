import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PublicKeyModule } from '../public-key/public-key.module';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepoModule } from '../repo/repo.module';

@Module({
  providers: [UserResolver, UserService,User],
  imports: [PublicKeyModule,forwardRef(()=>RepoModule),TypeOrmModule.forFeature([User])],
  exports: [UserService],
})
export class UserModule {}
