import { Observable } from 'rxjs';
import { AddUserDtoImpl } from './add-user-dto.interface';

export interface UserServiceImpl {
    addUser(addUserDto: AddUserDtoImpl): Observable<void>;
}
