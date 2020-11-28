import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TagsService {
    @RabbitRPC({
        exchange: 'tags',
        routingKey: 'rpc-route',
        queue: 'get-tags-queue',
    })
    public async getTagsHandler() {

    }
}
