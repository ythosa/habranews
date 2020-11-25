export interface AddUserDtoImpl {
    email: string;
    hashedPasword: string;
    salt: string;
    name: string;
    surname: string;
    tags: string[];
}
