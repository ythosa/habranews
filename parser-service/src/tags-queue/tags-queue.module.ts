import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';

@Module({
    imports: [
        RabbitMQModule.forRootAsync(RabbitMQModule, {
            useFactory: (configService: ConfigService) => ({
                exchanges: [
                    {
                        name: 'exchange1',
                        type: 'topic',
                    },
                ],
                uri: configService.get<string>('TAGS_QUEUE_URL'),
                connectionInitOptions: { wait: false },
            }),
            inject: [ConfigService],
        }),
    ],
})
export class TagsQueue {}
