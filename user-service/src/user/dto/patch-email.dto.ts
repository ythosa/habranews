import { IsEmail, IsNumber } from "class-validator";

export class PatchEmailDto {
    @IsNumber()
    userId: string;

    @IsEmail()
    email: string;
}
