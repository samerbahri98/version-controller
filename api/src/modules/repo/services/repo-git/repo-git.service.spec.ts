import { Test, TestingModule } from '@nestjs/testing';
import { RepoGitService } from './repo-git.service';

describe('RepoGitService', () => {
  let service: RepoGitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepoGitService],
    }).compile();

    service = module.get<RepoGitService>(RepoGitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
