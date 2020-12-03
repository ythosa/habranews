import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Controller, Get, Logger } from '@nestjs/common';
import { TagsImpl } from 'src/user/interfaces/tags.interface';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
    private readonly logger = new Logger();
    
    constructor(private readonly tagsService: TagsService) {}

    @Get('/getAvailableTags')
    getAvailableTags(): Promise<TagsImpl> {
        this.logger.log('Getting all available tags...');
        
        return this.tagsService.getAvailableTags();
    }
}
