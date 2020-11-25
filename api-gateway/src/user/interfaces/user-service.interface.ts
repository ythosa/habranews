import { AddUserDtoImpl } from "./add-user-dto.interface";
import { GetUserByIdDtoImpl } from "./get-user-by-id-dto.interface";
import { PatchBioDtoImpl } from "./patch-bio-dto.interface";
import { PatchEmailDtoImpl } from "./patch-email-dto.interface";
import { PatchTagsDtoImpl } from "./patch-tags-dto.interface";
import { ChangePasswordDtoImpl } from "./change-password-dto.interface";
import { UserImpl } from "./user.interface";

export interface UserServiceImpl {
    addUser(addUserDto: AddUserDtoImpl): Promise<void>;

    changePassword(changePasswordDto: ChangePasswordDtoImpl): Promise<void>;
    patchTags(patchTagsDto: PatchTagsDtoImpl): Promise<void>;
    patchEmail(patchEmailDto: PatchEmailDtoImpl): Promise<void>;
    patchBio(patchBioDto: PatchBioDtoImpl): Promise<void>;

    getUserById(getUserByIdDto: GetUserByIdDtoImpl): Promise<UserImpl>;
}
