export interface IUser {
    email: string;
    hashedPassword: string;
    salt: string;
    name: string;
    surname: string;
    tags: string[];
}
