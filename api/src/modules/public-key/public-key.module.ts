import { Module } from '@nestjs/common';
import { PublicKeyService } from './public-key.service';
import { PublicKeyResolver } from './public-key.resolver';
import { PublicKey } from './entities/public-key.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [PublicKeyResolver, PublicKeyService],
  // imports:[TypeOrmModule.forFeature([PublicKey])],
  exports:[PublicKeyService]
})
export class PublicKeyModule {}
