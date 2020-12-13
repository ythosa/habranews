import {
    IsEmail,
    IsString,
    Matches,
    MaxLength,
    MinLength,
    Validate,
} from 'class-validator';
import { IsValidTags } from 'src/user/validators/tags.validator';

export class SignUpCredentialsDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    })
    password: string;

    @IsString()
    @MinLength(2)
    name: string;

    @IsString()
    @MinLength(2)
    surname: string;

    @Validate(IsValidTags)
    tags: string[];
}
