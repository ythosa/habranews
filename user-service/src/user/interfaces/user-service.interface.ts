import { AddUserDto } from '../dto/add-user.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';

export interface IUserService {
    addUser(addUserDto: AddUserDto): Promise<void>;
    changePassword(changePasswordDto: ChangePasswordDto): Promise<void>;
}
