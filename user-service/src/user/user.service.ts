import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddUserDto } from './dto/add-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { PatchBioDto } from './dto/patch-bio.dto';
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
}
