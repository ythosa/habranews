import { Type } from 'class-transformer';
import { ArrayMinSize, IsDefined, IsEmail, IsEnum, IsNotEmpty, Matches } from 'class-validator';
import { tagEnum } from '../enums/tag.enum';
import { IsValidTags } from '../validators/tags.validator';

export class SubscribeDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    mail: string;

    @ArrayMinSize(1)
    // @IsValidTags()
    @IsEnum(tagEnum, { each: true })
    @IsDefined()
    tags: string[];
}
