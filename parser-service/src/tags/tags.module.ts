import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq/lib/rabbitmq.module';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TagsService } from './tags.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './schemas/tag.schema';
import * as redisStore from 'cache-manager-redis-store';

@Module({
    imports: [
        RabbitMQModule.forRootAsync(RabbitMQModule, {
            useFactory: (configService: ConfigService) => ({
                exchanges: [
                    {
                        name: 'tags-exchange',
                        type: 'direct',
                    },
                    {
                        name: 'notifications-exchange',
                        type: 'direct',
                    },
                ],
                uri: configService.get<string>('TAGS_QUEUE_URL'),
                connectionInitOptions: { wait: false },
            }),
            inject: [ConfigService],
        }),
        CacheModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                store: redisStore,
                host: configService.get<string>('CACHE_HOST'),
                port: configService.get<string>('CACHE_PORT'),
            }),
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]),
    ],
    providers: [TagsService],
})
export class TagsModule {}
