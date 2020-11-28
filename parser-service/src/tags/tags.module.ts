import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq/lib/rabbitmq.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';

@Module({
    imports: [
        RabbitMQModule.forRootAsync(RabbitMQModule, {
            useFactory: (configService: ConfigService) => ({
                exchanges: [
                    {
                        name: 'tags-exchange',
                        type: 'direct',
                    },
                ],
                uri: configService.get<string>('TAGS_QUEUE_URL'),
                connectionInitOptions: { wait: false },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [TagsService],
    controllers: [TagsController]
})
export class TagsModule {}
