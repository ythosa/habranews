import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddUserDto } from './interfaces/add-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
    ) {}

    async updateUserTags(addUserDto: AddUserDto): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { mail: addUserDto.mail },
        });

        if (user) {
            return this.patchUserTag(user, addUserDto.tag);
        }

        return this.createNewUserFromAddUserDto(addUserDto);
    }

    private async createNewUserFromAddUserDto(
        addUserDto: AddUserDto,
    ): Promise<User> {
        const user = new User();
        user.mail = addUserDto.mail;
        user.tag = addUserDto.tag;
        user.name = addUserDto.name;
        await this.userRepository.save([addUserDto]);

        return user;
    }

    private async patchUserTag(user: User, tag: string): Promise<User> {
        user.tag = tag;
        await this.userRepository.update(user.id, user);

        return user;
    }
}
