import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { configModule } from './configure.root';

@Module({
    imports: [UserModule, configModule],
})
export class AppModule {}
