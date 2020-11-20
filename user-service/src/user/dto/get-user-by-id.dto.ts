import { IsNumber } from 'class-validator';

export class GetUserByIdDto {
    @IsNumber()
    userId: string;
}
