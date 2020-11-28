import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { tagsEnum } from './enums/tags.enum';
import { TagsImpl } from './interfaces/tags.interface';

@Injectable()
export class TagsService {
    public async getAvailableTags(): Promise<TagsImpl> {
        return {
            tags: Object.values(tagsEnum),
        }
    }

    @RabbitRPC({
        exchange: 'tags-exchange',
        routingKey: 'subscribe-route',
        queue: 'subscribe-queue',
    })
    public async patchTags(msg: TagsImpl) {
        // patch tags in database
    }
}
