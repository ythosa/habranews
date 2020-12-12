import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { TagsService } from 'src/tags/tags.service';

@Injectable()
@ValidatorConstraint({ name: 'TagsValidation', async: true })
export class IsValidTags implements ValidatorConstraintInterface {
    constructor(private readonly tagsService: TagsService) {}

    async validate(value: string[]): Promise<boolean> {
        const { tags: validTags } = await this.tagsService.getAvailableTags();

        return value.every((t) => {
            return validTags.includes(t);
        });
    }

    defaultMessage(args: ValidationArguments) {
        return `Invalid tags passed`;
    }
}
