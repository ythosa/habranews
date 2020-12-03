import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Controller, Get } from '@nestjs/common';
import { TagsImpl } from 'src/user/interfaces/tags.interface';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @Get('/getAvailableTags')
    getAvailableTags(): Promise<TagsImpl> {
        return this.tagsService.getAvailableTags();
    }
}
