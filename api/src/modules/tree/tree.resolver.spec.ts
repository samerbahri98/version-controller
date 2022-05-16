import { Test, TestingModule } from '@nestjs/testing';
import { TreeResolver } from './tree.resolver';

describe('TreeResolver', () => {
  let resolver: TreeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TreeResolver],
    }).compile();

    resolver = module.get<TreeResolver>(TreeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
