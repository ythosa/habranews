import { Module } from '@nestjs/common';

import { SubscriptionModule } from './subscription/subscription.module';
import { configModule } from './configure.root';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [SubscriptionModule, configModule, AuthModule],
})
export class AppModule {}
