import { Test, TestingModule } from '@nestjs/testing';
import { GitServerService } from './git-server.service';

describe('GitServerService', () => {
  let service: GitServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GitServerService],
    }).compile();

    service = module.get<GitServerService>(GitServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
