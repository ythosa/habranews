import { Observable } from 'rxjs';
import { GetUserByIdDto } from './get-user-by-id.interface';
import { IUser } from './user.interface';

export interface IUserService {
    getUserById(getUserByIdDto: GetUserByIdDto): Observable<IUser>;
}
