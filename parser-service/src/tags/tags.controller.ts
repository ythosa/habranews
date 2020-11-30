import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { TagsImpl } from './interfaces/tags.interface';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @RabbitRPC({
        exchange: 'tags-exchange',
        routingKey: 'rpc-route',
        queue: 'get-tags-queue',
    })
    public async getTagsHandler(): Promise<TagsImpl> {
        return this.tagsService.getAvailableTags();
    }

    @RabbitRPC({
        exchange: 'tags-exchange',
        routingKey: 'subscribe-route',
        queue: 'subscribe-queue',
    })
    public async patchTagsHandler(msg: TagsImpl) {
        this.tagsService.patchTags(msg);
    }
}
