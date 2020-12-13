import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { UserServiceImpl } from './interfaces/user-service.interface';

@Injectable()
export class UserService {
    private logger = new Logger(UserService.name);

    private userService: UserServiceImpl;

    constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

    onModuleInit() {
        this.userService = this.client.getService<UserServiceImpl>(
            'UserService',
        );
    }
}
