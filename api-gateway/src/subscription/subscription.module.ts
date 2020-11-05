import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {join, resolve} from 'path';

@Module({
    providers: [SubscriptionService],
    controllers: [SubscriptionController],
    imports: [
        ClientsModule.register([{
            name: 'USER_PACKAGE',
            transport: Transport.GRPC,
            options: {
                package: 'user',
                protoPath: join(resolve(process.cwd(), '..'), 'protobufs/user-service/user.proto'),
            }
        }]),
    ]
})
export class SubscriptionModule {}
