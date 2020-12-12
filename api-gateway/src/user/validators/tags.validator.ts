import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { TagsService } from 'src/tags/tags.service';

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
