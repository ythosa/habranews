import { IsString } from 'class-validator';

export class GetUsersByTagDto {
    @IsString()
    tag: string;
}
