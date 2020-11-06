import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: configService.get<any>("DBTYPE"),
                host: configService.get<string>("DBHOST"),
                port: configService.get<number>("PGPORT"),
                username: configService.get<string>("PGUSER"),
                password: configService.get<string>("PGPASSWORD"),
                database: configService.get<string>("PGDATABASE"),
                entities: [__dirname + '/../**/*.entity.{js,ts}'],
                synchronize: configService.get<boolean>("DBSYNCHRONIZE"),
            }),
            inject: [ConfigService]
        })
    ]
})
export class DatabaseModule {}
