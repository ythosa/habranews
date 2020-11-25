import { AddUserDtoImpl } from "./add-user-dto.interface";

export interface UserServiceImpl {
    addUser(addUserDto: AddUserDtoImpl): Promise<void>;
}
