import { Module } from '@nestjs/common';

import { SubscriptionModule } from './subscription/subscription.module';
import { configModule } from './configure.root';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [SubscriptionModule, configModule, AuthModule, UserModule],
})
export class AppModule {}
