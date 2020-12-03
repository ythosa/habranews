import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
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
  ],
  controllers: [TagsController],
  providers: [TagsService]
})
export class TagsModule {}
