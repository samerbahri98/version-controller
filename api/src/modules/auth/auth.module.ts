import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { StrategyService } from './services/strategy.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from './resolvers/auth.resolver';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({
    secret:process.env.ACCESS_TOKEN_SECRET
  })],
  providers: [StrategyService,AuthService,AuthResolver,JwtAuthGuard],
  exports:[JwtAuthGuard]
})
export class AuthModule {}
