import { Module } from '@nestjs/common';

import { configModule } from './configure.root';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TagsModule } from './tags/tags.module';
import { QueueModule } from './queue/queue.module';
import { ValidationModule } from './validation/validation.module';

@Module({
    imports: [
        configModule,
        AuthModule,
        UserModule,
        TagsModule,
        QueueModule,
        ValidationModule,
    ],
})
export class AppModule {}
