import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { IIsOk } from './interfaces/is-ok.interface';
import { AddUserDto } from './interfaces/add-user.dto';

@Controller()
export class UserController {
    @GrpcMethod('UserService', 'AddUser')
    async addUser(addUserDto: AddUserDto, metadata: any): Promise<IIsOk> {
        console.log("DATA:!!!! ", addUserDto);
        return { ok: "ok" };
    }
}
