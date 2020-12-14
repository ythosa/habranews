import { Module } from '@nestjs/common';
import { TagsModule } from 'src/tags/tags.module';
import { IsValidTags } from './tags.validator';

@Module({
    imports: [TagsModule],
    providers: [IsValidTags],
    exports: [IsValidTags],
})
export class ValidationModule {}
