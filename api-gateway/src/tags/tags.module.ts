import { AmqpConnection, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

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
    ],
    controllers: [TagsController],
    providers: [TagsService, AmqpConnection],
    exports: [TagsService],
})
export class TagsModule {}
