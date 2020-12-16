import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CacheWorkerService {
    constructor(
        @Inject(CACHE_MANAGER) private hubsPagesCache: Cache,
        private readonly configService: ConfigService,
    ) {}

    public async isUpdated(hub: string, body: string): Promise<boolean> {
        const saved = await this.hubsPagesCache.get<string>(hub);

        return bcrypt.compare(body, saved);
    }

    public async saveHashOfPage(hub: string, body: string): Promise<void> {
        const hash = await bcrypt.hash(body);
        this.hubsPagesCache.set(hub, hash, {
            ttl: this.configService.get<number>('CACHE_TTL'),
        });
    }
}
