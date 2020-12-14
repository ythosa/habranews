import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GenerateTokensDto } from './dto/generate-token.dto';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { AddUserDtoImpl } from './interfaces/add-user-dto.interface';
import { AuthServiceImpl } from './interfaces/auth-service.interface';
import { CryptedPasswordImpl } from './interfaces/crypted-password.interface';
import { TokensImpl } from './interfaces/tokens.interface';
import { UserServiceImpl } from './interfaces/user-service.interface';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    private authService: AuthServiceImpl;
    private userService: UserServiceImpl;

    constructor(
        @Inject('AUTH_PACKAGE') private authClient: ClientGrpc,
        @Inject('USER_PACKAGE') private userClient: ClientGrpc,
    ) {}

    onModuleInit() {
        this.authService = this.authClient.getService<AuthServiceImpl>(
            'AuthService',
        );

        this.userService = this.userClient.getService<UserServiceImpl>(
            'UserService',
        );
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<TokensImpl> {
        return this.authService
            .generate(authCredentialsDto as GenerateTokensDto)
            .toPromise();
    }

    async signUp(authCredentialsDto: SignUpCredentialsDto): Promise<void> {
        const cryptedPassword: CryptedPasswordImpl = await this.authService
            .cryptPassword({
                password: authCredentialsDto.password,
            })
            .toPromise();

        this.logger.debug(
            `Crypted password: ${JSON.stringify(cryptedPassword)}`,
        );

        const addUserDto: AddUserDtoImpl = {
            email: authCredentialsDto.email,
            hashedPassword: cryptedPassword.hashedPassword,
            salt: cryptedPassword.salt,
            name: authCredentialsDto.name,
            surname: authCredentialsDto.surname,
            tags: authCredentialsDto.tags,
        };
        const result = await this.userService.addUser(addUserDto).toPromise();

        console.log(result);
    }
}
