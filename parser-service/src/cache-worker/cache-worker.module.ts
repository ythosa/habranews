import { Module } from '@nestjs/common';
import { CacheWorkerService } from './cache-worker.service';

@Module({
  providers: [CacheWorkerService]
})
export class CacheWorkerModule {}
