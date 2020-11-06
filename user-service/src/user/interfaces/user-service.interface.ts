import { Metadata, ServerUnaryCall } from 'grpc';
import { AddUserDto } from './add-user.dto';
import { IUser } from './user.interface';

export interface IUserService {
    addUser(
        addUserDto: AddUserDto,
        metadata: Metadata,
        call: ServerUnaryCall<any>,
    ): Promise<IUser>;
}
