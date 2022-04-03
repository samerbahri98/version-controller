import { Test, TestingModule } from '@nestjs/testing';
import { PublicKeyService } from './public-key.service';

describe('PublicKeyService', () => {
  let service: PublicKeyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicKeyService],
    }).compile();

    service = module.get<PublicKeyService>(PublicKeyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
