import { Test, TestingModule } from '@nestjs/testing';
import { CommitResolver } from './commit.resolver';

describe('CommitResolver', () => {
  let resolver: CommitResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommitResolver],
    }).compile();

    resolver = module.get<CommitResolver>(CommitResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
