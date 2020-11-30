import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { TagsModule } from './tags/tags.module';

@Module({
    imports: [
        ConfigModule,
        TagsModule,
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>('DB_URL'),
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
