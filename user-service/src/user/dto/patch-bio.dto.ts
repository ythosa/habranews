import { IsNumber, IsString } from 'class-validator';

export class PatchBioDto {
    @IsNumber()
    userId: string;

    @IsString()
    name: string;

    @IsString()
    surname: string;
}
