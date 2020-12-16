import { CacheWorkerService } from './cache-worker.service';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
    imports: [
        CacheModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                store: redisStore,
                host: configService.get<string>('CACHE_HOST'),
                port: configService.get<string>('CACHE_PORT'),
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [CacheWorkerService],
    exports: [CacheWorkerService],
})
export class CacheWorkerModule {}
