import { Module } from '@nestjs/common';

import { SubscriptionModule } from './subscription/subscription.module';
import { configModule } from './configure.root';

@Module({
    imports: [
        SubscriptionModule,
        configModule
    ],
})
export class AppModule {}
