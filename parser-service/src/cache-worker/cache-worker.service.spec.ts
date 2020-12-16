import { Test, TestingModule } from '@nestjs/testing';
import { CacheWorkerService } from './cache-worker.service';

describe('CacheWorkerService', () => {
  let service: CacheWorkerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheWorkerService],
    }).compile();

    service = module.get<CacheWorkerService>(CacheWorkerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
