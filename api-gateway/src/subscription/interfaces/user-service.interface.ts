import { AddUserDto } from './add-user.dto';
import { IIsOk } from './is-ok.interface';

export interface IUserService {
    addUser(addUserDto: AddUserDto): Promise<IIsOk>;
}
