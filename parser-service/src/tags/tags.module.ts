import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq/lib/rabbitmq.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './schemas/tag.schema';

@Module({
    imports: [
        RabbitMQModule.forRootAsync(RabbitMQModule, {
            useFactory: (configService: ConfigService) => ({
                exchanges: [
                    {
                        name: 'tags-exchange',
                        type: 'topic',
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
        MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]),
    ],
    providers: [TagsService],
    controllers: [TagsController],
})
export class TagsModule {}
