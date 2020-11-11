import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";
import { tagEnum } from "../enums/tag.enum";

export function IsValidTags(validationOptions?: ValidationOptions) {
    return (object: Object, propertyName: string) => {
        registerDecorator({
            name: 'isValidTags',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: string[]) {
                    const validTags = Object.values(tagEnum).map((t) => String(t));
                    return value.every((t) => { return validTags.includes(t) })
                }
            }
        })
    }
}
