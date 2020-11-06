import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SubscribeDto } from './dto/subscribe.dto';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
    // todo: logger
    constructor(private readonly subscriptionService: SubscriptionService) {}

    @Post()
    subscribe(
        @Body(ValidationPipe) subscribeDto: SubscribeDto,
    ): Observable<any> {
        return this.subscriptionService.subscribe(subscribeDto);
    }
}
