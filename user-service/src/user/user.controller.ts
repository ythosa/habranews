import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AddUserDto } from './dto/add-user.dto';
import { UserService } from './user.service';
import { IUserService } from './interfaces/user-service.interface';
import { ChangePasswordDto } from './dto/change-password.dto';
import { PatchTagsDto } from './dto/patch-tags.dto';

@Controller()
export class UserController implements IUserService {
    private logger = new Logger(UserController.name);

    constructor(private readonly userService: UserService) {}

    @GrpcMethod('UserService')
    async addUser(addUserDto: AddUserDto): Promise<void> {
        this.logger.log(`Adding user with data: ${JSON.stringify(addUserDto)}`);

        return this.userService.addUser(addUserDto);
    }

    @GrpcMethod('UserService')
    async changePassword(changePasswordDto: ChangePasswordDto): Promise<void> {
        this.logger.log(`Chaging password with data: ${JSON.stringify(changePasswordDto)}`);

        return this.userService.changePassword(changePasswordDto);
    }

    @GrpcMethod('UserService')
    async patchTags(patchTagsDto: PatchTagsDto): Promise<void> {
        this.logger.log(`Patching tags with data: ${JSON.stringify(patchTagsDto)}`);

        return this.userService.patchTags(patchTagsDto);
    }
}
