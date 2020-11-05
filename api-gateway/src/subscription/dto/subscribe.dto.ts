import { IsEmail, IsEnum, IsNotEmpty, Matches } from 'class-validator';
import { tagEnum } from '../enums/tag.enum';

export class SubscribeDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    mail: string;

    @IsEnum(tagEnum)
    tag: string;
}
