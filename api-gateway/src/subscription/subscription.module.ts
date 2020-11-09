import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join, resolve } from 'path';
import { ConfigService } from '@nestjs/config';

@Module({
    providers: [SubscriptionService],
    controllers: [SubscriptionController],
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
                        url: configService.get<string>("USER_SERVICE_URL"),
                    },
                }),
                inject: [ConfigService]
            },
        ]),
    ],
})
export class SubscriptionModule {}
