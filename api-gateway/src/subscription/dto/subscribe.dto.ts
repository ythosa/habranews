import { ArrayMinSize, IsDefined, IsEmail, IsEnum, IsNotEmpty, Matches } from 'class-validator';
import { IsValidTags } from '../validators/tags.validator';

export class SubscribeDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    mail: string;

    @ArrayMinSize(1)
    @IsValidTags({ message: "unknown tag name" })
    tags: string[];
}
