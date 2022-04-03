import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PublicKeyService } from './public-key.service';
import { PublicKey } from './entities/public-key.entity';
import { CreatePublicKeyInput } from './dto/create-public-key.input';
import { UpdatePublicKeyInput } from './dto/update-public-key.input';

@Resolver(() => PublicKey)
export class PublicKeyResolver {
  constructor(private readonly publicKeyService: PublicKeyService) {}

  
}
