import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq/lib/rabbitmq.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TagsService } from './tags.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './schemas/tag.schema';
import { CacheWorkerModule } from 'src/cache-worker/cache-worker.module';

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
        CacheWorkerModule,
        MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]),
    ],
    providers: [TagsService],
})
export class TagsModule {}
