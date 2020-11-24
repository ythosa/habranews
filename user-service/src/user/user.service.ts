import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddUserDto } from './dto/add-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { GetUserByIdDto } from './dto/get-user-by-id.dto';
import { GetUsersByTagDto } from './dto/get-users-by-tag.dto';
import { PatchBioDto } from './dto/patch-bio.dto';
import { PatchEmailDto } from './dto/patch-email.dto';
import { PatchTagsDto } from './dto/patch-tags.dto';
import { UserImpl } from './interfaces/user.interface';
import { UserInformationForMailImpl } from './interfaces/user-information-for-mail';
import { UserRepository } from './user.repository';
import { GetUserByEmailDto } from './dto/get-user-by-email.dto';
import { User } from './user.entity';

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
        const user = await this.userRepository.findOne(
            changePasswordDto.userId,
        );
        if (!user) throw new BadRequestException('Invalid userId');

        user.hashedPassword = changePasswordDto.hashedPassword;
        user.salt = changePasswordDto.salt;

        await this.userRepository.update(user.id, user);
    }

    async patchTags(patchTagsDto: PatchTagsDto): Promise<void> {
        const user = await this.userRepository.findOne(patchTagsDto.userId);
        if (!user) throw new BadRequestException('Invalid userId');

        user.tags = patchTagsDto.tags;

        await this.userRepository.update(user.id, user);
    }

    async patchEmail(patchEmailDto: PatchEmailDto): Promise<void> {
        const user = await this.userRepository.findOne(patchEmailDto.userId);
        if (!user) throw new BadRequestException('Invalid userId');

        user.email = patchEmailDto.email;

        await this.userRepository.update(user.id, user);
    }

    async patchBio(patchBioDto: PatchBioDto): Promise<void> {
        const user = await this.userRepository.findOne(patchBioDto.userId);
        if (!user) throw new BadRequestException('Invalid userId');

        user.name = patchBioDto.name;
        user.surname = patchBioDto.surname;

        await this.userRepository.update(user.id, user);
    }

    async getUserById(getUserByIdDto: GetUserByIdDto): Promise<UserImpl> {
        const user = await this.userRepository.findOne(getUserByIdDto.userId);
        if (!user) throw new BadRequestException('Invalid userId');

        return user;
    }

    async getUsersByTag(
        getUsersByTagDto: GetUsersByTagDto,
    ): Promise<UserInformationForMailImpl[]> {
        const users = await this.userRepository
            .createQueryBuilder('user')
            .where(':tag = ANY user.tags', { tag: getUsersByTagDto.tag })
            .getMany();

        const usersInfo: UserInformationForMailImpl[] = [];
        users.forEach((u) =>
            usersInfo.push({
                email: u.email,
                name: u.name,
                surname: u.surname,
            }),
        );

        return usersInfo;
    }

    async getUserByEmail(getUserByEmailDto: GetUserByEmailDto): Promise<UserImpl> {
        const user = await this.userRepository.findOne({
            where: {
                email: getUserByEmailDto.email,
            }
        })

        if (!user) {
            new BadRequestException('Invalid email');
        }

        return user
    }
}
