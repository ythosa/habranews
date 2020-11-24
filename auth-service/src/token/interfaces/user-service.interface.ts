import { Observable } from 'rxjs';
import { getUserByIdDtoImpl } from '../interfaces/get-user-by-id-dto.interface';
import { UserImpl } from './user.interface';

export interface UserServiceImpl {
    getUserById(getUserByIdDto: getUserByIdDtoImpl): Observable<UserImpl>;
}
