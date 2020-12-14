export interface UserImpl {
    id: string;
    email: string;
    hashedPassword: string;
    salt: string;
    name: string;
    surname: string;
    tags: string[];
}
