import { Test, TestingModule } from '@nestjs/testing';
import { PublicKeyResolver } from './public-key.resolver';
import { PublicKeyService } from './public-key.service';

describe('PublicKeyResolver', () => {
  let resolver: PublicKeyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicKeyResolver, PublicKeyService],
    }).compile();

    resolver = module.get<PublicKeyResolver>(PublicKeyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
