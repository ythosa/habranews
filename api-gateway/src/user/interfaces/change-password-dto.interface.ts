export interface ChangePasswordDtoImpl {
    userId: string;
    hashedPassword: string;
    salt: string;
}
