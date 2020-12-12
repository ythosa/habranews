import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { TagsImpl } from 'src/user/interfaces/tags.interface';

@ValidatorConstraint({ name: 'TagsValidation', async: true })
export class IsValidTags implements ValidatorConstraintInterface {
    constructor(private readonly amqpConnection: AmqpConnection) {}

    async validate(value: string[]): Promise<boolean> {
        const { tags: validTags } = await this.amqpConnection.request<TagsImpl>({
            exchange: 'tags-exchange',
            routingKey: 'rpc-route',
            timeout: 10000,
        });

        return value.every((t) => {
            return validTags.includes(t);
        });
    }

    defaultMessage(args: ValidationArguments) {
        return `Invalid tags passed`;
    }
}
