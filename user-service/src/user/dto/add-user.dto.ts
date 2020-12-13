import { IsArray, IsEmail, IsString } from 'class-validator';

export class AddUserDto {
    @IsEmail()
    email: string;

    @IsString()
    hashedPassword: string;

    @IsString()
    salt: string;

    @IsString()
    name: string;

    @IsString()
    surname: string;

    @IsArray()
    tags: string[];
}
