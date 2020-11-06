import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { SubscribeDto } from './dto/subscribe.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { IUserService } from './interfaces/user-service.interface';
import { AddUserDto } from './interfaces/add-user.dto';
import { IUser } from './interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable()
export class SubscriptionService implements OnModuleInit {
    private logger = new Logger(SubscriptionService.name);

    private userService: IUserService;

    constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

    onModuleInit() {
        this.userService = this.client.getService<IUserService>('UserService');
    }

    subscribe(subscribeDto: SubscribeDto): Observable<IUser> {
        this.logger.log(
            `Subscribing with data: ${JSON.stringify(subscribeDto)}`,
        );
        return this.addUser(subscribeDto as AddUserDto);
    }

    // private async makeTagCheckable(): Promise<void> {}

    private addUser(addUserDto: AddUserDto): Observable<IUser> {
        this.logger.log(`Adding user with data: ${JSON.stringify(addUserDto)}`);
        return this.userService.addUser(addUserDto);
    }
}
