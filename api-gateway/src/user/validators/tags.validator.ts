import { AmqpConnection } from '@golevelup/nestjs-rabbitmq/lib/amqp/connection';
import {
    ValidationArguments,
    ValidatorConstraintInterface,
} from 'class-validator';
import { TagsImpl } from '../interfaces/tags.interface';

export class IsValidTags implements ValidatorConstraintInterface {
    constructor(private readonly amqpConnection: AmqpConnection) {}

    async validate(value: string[]): Promise<boolean> {
        const { tags: validTags } = await this.amqpConnection.request<TagsImpl>({
            exchange: 'tags-exchange',
            routingKey: 'rpc-route',
        })

        return value.every((t) => {
            return validTags.includes(t);
        });
    }

    defaultMessage(args: ValidationArguments) {
        return `Invalid tags passed`;
    }
}
