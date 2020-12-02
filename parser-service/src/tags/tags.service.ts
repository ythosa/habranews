import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { tagsEnum } from './enums/tags.enum';
import { NotificationMessageImpl } from './interfaces/notification-message.interface';
import { PostImpl } from './interfaces/post.interface';
import { TagsImpl } from './interfaces/tags.interface';
import { Tag, TagDocument } from './schemas/tag.schema';
import { HubScrapper } from './scrapping/hub-scrapper';

@Injectable()
export class TagsService {
    private logger = new Logger(TagsService.name);

    constructor(
        private readonly amqpConnection: AmqpConnection,
        @InjectModel(Tag.name) private readonly tagModel: Model<TagDocument>,
    ) {}

    public async getAvailableTags(): Promise<TagsImpl> {
        return {
            tags: Object.values(tagsEnum),
        };
    }

    private async getTrackedTags(): Promise<string[]> {
        return (await this.tagModel.find({}).exec()).map(
            (tagSchema) => tagSchema.tag,
        );
    }

    public async patchTags(msg: TagsImpl) {
        const currentTags: string[] = await this.getTrackedTags();
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

    @Cron('0 * * * *') // every hour
    // @Cron('20 * * * * *')
    async handleCron() {
        this.logger.log('Starting parsing habr...');
        const hubScrapper = new HubScrapper();

        const hubs = await this.getTrackedTags();
        for (const hub of hubs) {
            const post = await this.tagModel.findOne({
                tag: hub,
            });
            const lastId = post.postId ?? null;

            this.logger.debug(`LastID of ${hub}: ${lastId}`);
            const posts: PostImpl[] = await hubScrapper.getNewPosts(
                hub,
                lastId,
            );

            if (!posts.length) return; // no updates -> return

            const notificationMessage: NotificationMessageImpl = {
                tag: hub,
                posts: posts,
            };
            this.amqpConnection.publish(
                // publish updates
                'notifications-exchange',
                'notification-route',
                notificationMessage,
            );

            this.logger.log(
                `I am sending updates with last post with id ${notificationMessage.posts[0].postId}.
                Title: ${notificationMessage.posts[0].title}`,
            );
            await this.tagModel // update last id into db
                .updateOne(
                    { tag: hub },
                    {
                        tag: hub,
                        link: posts[0].link,
                        postId: posts[0].postId,
                    },
                    { upsert: true },
                )
                .exec();
        }
    }
}
