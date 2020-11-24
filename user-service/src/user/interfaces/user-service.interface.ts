import { AddUserDto } from '../dto/add-user.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { GetUserByIdDto } from '../dto/get-user-by-id.dto';
import { GetUsersByTagDto } from '../dto/get-users-by-tag.dto';
import { PatchBioDto } from '../dto/patch-bio.dto';
import { PatchEmailDto } from '../dto/patch-email.dto';
import { PatchTagsDto } from '../dto/patch-tags.dto';
import { UserImpl } from './user.interface';
import { UserInformationForMailImpl } from './user-information-for-mail';

export interface UserServiceImpl {
    addUser(addUserDto: AddUserDto): Promise<void>;

    changePassword(changePasswordDto: ChangePasswordDto): Promise<void>;
    patchTags(patchTagsDto: PatchTagsDto): Promise<void>;
    patchEmail(patchEmailDto: PatchEmailDto): Promise<void>;
    patchBio(patchBioDto: PatchBioDto): Promise<void>;

    getUserById(getUserByIdDto: GetUserByIdDto): Promise<UserImpl>;
    getUsersByTag(
        getUsersByTagDto: GetUsersByTagDto,
    ): Promise<UserInformationForMailImpl[]>;
}
