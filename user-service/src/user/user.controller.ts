import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AddUserDto } from './interfaces/add-user.dto';
import { UserService } from './user.service';
import { IUserService } from './interfaces/user-service.interface';

@Controller()
export class UserController implements IUserService {
    private logger = new Logger(UserController.name);

    constructor(private readonly userService: UserService) {}

    @GrpcMethod('UserService')
    async addUser(addUserDto: AddUserDto): Promise<void> {
        this.logger.log(`Adding user with data: ${JSON.stringify(addUserDto)}`);

        return this.userService.addUser(addUserDto);
    }
}
