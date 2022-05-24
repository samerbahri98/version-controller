import { Test, TestingModule } from '@nestjs/testing';
import { RepoDbService } from './repo-db.service';

describe('RepoDbService', () => {
  let service: RepoDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepoDbService],
    }).compile();

    service = module.get<RepoDbService>(RepoDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
