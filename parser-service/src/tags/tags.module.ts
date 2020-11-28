import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq/lib/rabbitmq.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TagsService } from './tags.service';

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
    providers: [TagsService]
})
export class TagsModule {}
