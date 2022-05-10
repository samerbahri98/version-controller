import { Test, TestingModule } from '@nestjs/testing';
import { UserGitService } from './user-git.service';

describe('UserGitService', () => {
  let service: UserGitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGitService],
    }).compile();

    service = module.get<UserGitService>(UserGitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
