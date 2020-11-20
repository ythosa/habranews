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

    async addUser(addUserDto: AddUserDto): Promise<void> {
        this.userRepository.save([addUserDto]);
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
