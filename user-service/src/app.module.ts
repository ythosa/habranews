import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { configModule } from './configure.root';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, configModule],
})
export class AppModule {}
