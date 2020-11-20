import { IsNumber, IsString } from "class-validator";

export class ChangePasswordDto {
    @IsNumber()
    userId: string;

    @IsString()
    hashedPassword: string;

    @IsString()
    salt: string;
}
