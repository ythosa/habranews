import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { tagsEnum } from './enums/tags.enum';
import { TagsImpl } from './interfaces/tags.interface';
import { Tag, TagDocument } from './schemas/tag.schema';

@Injectable()
export class TagsService {
    private logger = new Logger(TagsService.name);
    
    constructor(
        @InjectModel(Tag.name) private readonly tagModel: Model<TagDocument>,
    ) {}

    public async getAvailableTags(): Promise<TagsImpl> {
        return {
            tags: Object.values(tagsEnum),
        };
    }

    public async patchTags(msg: TagsImpl) {
        const currentTags: string[] = (await this.tagModel.find({}).exec()).map(
            (tagSchema) => tagSchema.tag,
        );
        const unstagedTags: string[] = msg.tags.filter(
            (tag) => !currentTags.includes(tag),
        );

        unstagedTags.forEach((tagName) => {
            const newTag: TagDocument = new this.tagModel({
                tag: tagName,
            });
            newTag.save();
        });
    }

    // @Cron('0 * * * *')
    @Cron('45 * * * * *')
    handleCron() {
        this.logger.log('Starting parsing habr...');
    }
}
