import { Observable } from 'rxjs';
import { AddUserDto } from './add-user.dto';
import { IUser } from './user.interface';

export interface IUserService {
    addUser(addUserDto: AddUserDto): Observable<any>;
}
