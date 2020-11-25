export interface UserImpl {
    id: number;
    email: string;
    hashedPassword: string;
    salt: string;
    name: string;
    surname: string;
    tags: string[];
}
