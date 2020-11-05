import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { IIsOk } from './interfaces/is-ok.interface';
import { AddUserDto } from './interfaces/add-user.dto';

@Controller()
export class UserController {
    private logger = new Logger(UserController.name);

    @GrpcMethod('UserService', 'AddUser')
    async addUser(addUserDto: AddUserDto): Promise<IIsOk> {
        this.logger.log(`Adding user with data: ${JSON.stringify(addUserDto)}`);
        return { ok: 'ok' };
    }
}
