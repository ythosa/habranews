import { IsArray, IsNumber } from "class-validator";

export class PatchTagsDto {
    @IsNumber()
    userId: string;

    @IsArray()
    tags: string[];
}
