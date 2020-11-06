import { Body, Controller, Logger, Post, ValidationPipe } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SubscribeDto } from './dto/subscribe.dto';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
    private logger = new Logger(SubscriptionController.name);

    constructor(private readonly subscriptionService: SubscriptionService) {}

    @Post()
    subscribe(
        @Body(ValidationPipe) subscribeDto: SubscribeDto,
    ): Observable<any> {
        this.logger.log(
            `Subscribing with data: ${JSON.stringify(subscribeDto)}`
        );

        return this.subscriptionService.subscribe(subscribeDto);
    }
}
