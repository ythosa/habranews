import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { IUser } from './interfaces/user.interface';
import { AddUserDto } from './interfaces/add-user.dto';
import { UserService } from './user.service';
import { IUserService } from './interfaces/user-service.interface';
import { Metadata, ServerUnaryCall } from 'grpc';

@Controller()
export class UserController implements IUserService {
    private logger = new Logger(UserController.name);

    constructor(private readonly userService: UserService) {}

    @GrpcMethod('UserService')
    async addUser(
        addUserDto: AddUserDto,
        metadata: Metadata,
        call: ServerUnaryCall<any>,
    ): Promise<IUser> {
        this.logger.log(`Adding user with data: ${JSON.stringify(addUserDto)}`);

        return this.userService.updateUserTags(addUserDto);
    }
}
