import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { CryptPasswordDto } from './dto/crypt-password.dto';
import { GenerateTokensDto } from './dto/generate-token.dto';
import { VerifyByAccessTokenDto } from './dto/verify-by-acess-token,dto';
import { CryptedPasswordImpl } from './interfaces/crypted-password.interface';
import { TokensImpl } from './interfaces/tokens.interface';
import { UserIdImpl } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { ClientGrpc } from '@nestjs/microservices';
import { UserServiceImpl } from './interfaces/user-service.interface';

@Injectable()
export class TokenService {
    private userService: UserServiceImpl;

    constructor(
        @Inject(CACHE_MANAGER) private refreshTokensManager: Cache,
        @Inject('USER_PACKAGE') private client: ClientGrpc
    ) {}

    onModuleInit() {
        this.userService = this.client.getService<UserServiceImpl>('UserService');
    }

    generateTokens(generateTokensDto: GenerateTokensDto): Promise<TokensImpl> {
        // const user =
        throw new Error('Method not implemented.');
    }

    verifyByAccessToken(verifyByAccessTokenDto: VerifyByAccessTokenDto): Promise<UserIdImpl> {
        throw new Error('Method not implemented.');
    }

    cryptPassword(cryptPasswordDto: CryptPasswordDto): Promise<CryptedPasswordImpl> {
        throw new Error('Method not implemented.');
    }
}
