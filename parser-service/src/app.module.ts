import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { ScheduleModule } from '@nestjs/schedule';
import { configModule } from './configure.root';
import { TagsModule } from './tags/tags.module';
import { CacheWorkerModule } from './cache-worker/cache-worker.module';

@Module({
    imports: [
        configModule,
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
        ScheduleModule.forRoot(),
        CacheWorkerModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
