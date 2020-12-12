import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { TagsImpl } from 'src/user/interfaces/tags.interface';

@Injectable()
export class TagsService {
    constructor(private readonly amqpConnection: AmqpConnection) {}

    async getAvailableTags(): Promise<TagsImpl> {
        return this.amqpConnection.request<TagsImpl>({
            exchange: 'tags-exchange',
            routingKey: 'rpc-route',
            timeout: 10000,
        });
    }

    patchTags(tags: TagsImpl): void {
        this.amqpConnection.publish(
            'notifications-exchange',
            'update-tags-route',
            tags,
        );
    }
}
