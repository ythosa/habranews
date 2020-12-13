import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join, resolve } from 'path';
import { QueueModule } from 'src/queue/queue.module';
import { TagsModule } from 'src/tags/tags.module';
import { IsValidTags } from 'src/user/validators/tags.validator';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'USER_PACKAGE',
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        package: 'user',
                        protoPath: join(
                            resolve(process.cwd(), '..'),
                            'protobufs/user-service/user.proto',
                        ),
                        url: configService.get<string>('USER_SERVICE_URL'),
                    },
                }),
                inject: [ConfigService],
            },
        ]),
        QueueModule,
        TagsModule,
    ],
    controllers: [UserController],
    providers: [UserService, IsValidTags],
    exports: [IsValidTags],
})
export class UserModule {}
