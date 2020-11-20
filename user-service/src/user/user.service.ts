import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddUserDto } from './dto/add-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { PatchEmailDto } from './dto/patch-email.dto';
import { PatchTagsDto } from './dto/patch-tags.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
    ) {}

    async addUser(addUserDto: AddUserDto): Promise<void> {
        this.userRepository.save([addUserDto]);
    }

    async changePassword(changePasswordDto: ChangePasswordDto): Promise<void> {
        const user = await this.userRepository.findOne(changePasswordDto.userId);
        user.hashedPassword = changePasswordDto.hashedPassword;
        user.salt = changePasswordDto.salt;

        await this.userRepository.update(user.id, user);
    }

    async patchTags(patchTagsDto: PatchTagsDto): Promise<void> {
        const user = await this.userRepository.findOne(patchTagsDto.userId);
        user.tags = patchTagsDto.tags;

        await this.userRepository.update(user.id, user);
    }

    async patchEmail(patchEmailDto: PatchEmailDto): Promise<void> {
        const user = await this.userRepository.findOne(patchEmailDto.userId);
        user.email = patchEmailDto.email;

        await this.userRepository.update(user.id, user);
    }

    async updateUserTags(addUserDto: AddUserDto): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { email: addUserDto.email },
        });

        if (user) {
            return this.patchUserTag(user, addUserDto.tags);
        }

        return this.createNewUserFromAddUserDto(addUserDto);
    }

    private async createNewUserFromAddUserDto(
        addUserDto: AddUserDto,
    ): Promise<User> {
        const user = new User();
        user.email = addUserDto.email;
        user.tags = addUserDto.tags;
        user.name = addUserDto.name;
        await this.userRepository.save([addUserDto]);

        return user;
    }

    private async patchUserTag(user: User, tags: string[]): Promise<User> {
        user.tags = Array.from(new Set(user.tags.concat(tags)));
        await this.userRepository.update(user.id, user);

        return user;
    }
}
