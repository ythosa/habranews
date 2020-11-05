import {Inject, Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {SubscribeDto} from './dto/subscribe.dto';
import {ClientGrpc} from '@nestjs/microservices';
import {IUserService} from './interfaces/user-service.interface';
import {AddUserDto} from './interfaces/add-user.dto';
import {IIsOk} from './interfaces/is-ok.interface';

@Injectable()
export class SubscriptionService implements OnModuleInit {
    private logger = new Logger(SubscriptionService.name);

    private userService: IUserService;

    constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

    onModuleInit() {
        this.userService = this.client.getService<IUserService>('UserService');
    }

    async subscribe(subscribeDto: SubscribeDto): Promise<void> {
        this.logger.log(this.userService);
        await this.addUser(subscribeDto as AddUserDto);

        return
    }

    private async makeTagCheckable(): Promise<void> {

    }

    private async addUser(addUserDto: AddUserDto): Promise<IIsOk> {
        this.logger.log('Я живой!')
        return this.userService.addUser(addUserDto);
    }
}
