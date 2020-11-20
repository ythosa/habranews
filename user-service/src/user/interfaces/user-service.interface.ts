import { AddUserDto } from './add-user.dto';
import { IUser } from './user.interface';

export interface IUserService {
    addUser(addUserDto: AddUserDto): Promise<void>;
}
