import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Controller, Logger } from '@nestjs/common';
import { TagsImpl } from './interfaces/tags.interface';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
    private readonly logger = new Logger();
    
    constructor(private readonly tagsService: TagsService) {}

    @RabbitRPC({
        exchange: 'tags-exchange',
        routingKey: 'rpc-route',
    })
    public async getTagsHandler(): Promise<TagsImpl> {
        this.logger.log('Getting all available tags...');

        return await this.tagsService.getAvailableTags();
    }

    @RabbitRPC({
        exchange: 'tags-exchange',
        routingKey: 'subscribe-route',
    })
    public async patchTagsHandler(msg: TagsImpl) {
        this.logger.log(`Patching tags with data: ${JSON.stringify(msg)}`);

        this.tagsService.patchTags(msg);
    }
}
