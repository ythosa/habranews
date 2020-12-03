import { Module } from '@nestjs/common';

import { configModule } from './configure.root';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TagsModule } from './tags/tags.module';

@Module({
    imports: [
        configModule,
        AuthModule,
        UserModule,
        TagsModule,
    ],
})
export class AppModule {}
