import {
    BadRequestException,
    CACHE_MANAGER,
    Inject,
    Injectable,
} from '@nestjs/common';
import { CryptPasswordDto } from './dto/crypt-password.dto';
import { GenerateTokensDto } from './dto/generate-token.dto';
import { VerifyByAccessTokenDto } from './dto/verify-by-acess-token,dto';
import { CryptedPasswordImpl } from './interfaces/crypted-password.interface';
import { TokensImpl } from './interfaces/tokens.interface';
import { UserIdImpl } from './interfaces/user-id.interface';
import * as bcrypt from 'bcrypt';
import { ClientGrpc } from '@nestjs/microservices';
import { UserServiceImpl } from './interfaces/user-service.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
    private userService: UserServiceImpl;

    constructor(
        @Inject(CACHE_MANAGER) private refreshTokensManager: Cache,
        @Inject('USER_PACKAGE') private client: ClientGrpc,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    onModuleInit() {
        this.userService = this.client.getService<UserServiceImpl>(
            'UserService',
        );
    }

    async generateTokens(
        generateTokensDto: GenerateTokensDto,
    ): Promise<TokensImpl> {
        const { email, password } = generateTokensDto;

        const user = await this.userService
            .getUserByEmail({ email })
            .toPromise();
        if (!user) {
            throw new BadRequestException('Invalid email or password');
        }

        const isValidPassword = await bcrypt.compare(
            password,
            user.hashedPassword,
        );
        if (!isValidPassword) {
            throw new BadRequestException('Invalid email or password');
        }

        const payload = { id: user.id };

        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('ACCESS_JWT_SECRET'),
            expiresIn: this.configService.get<string>('ACCESS_JWT_EXPIRES_IN'),
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('REFRESH_JWT_SECRET'),
            expiresIn: this.configService.get<string>('REFRESH_JWT_EXPIRES_IN'),
        });

        return { accessToken, refreshToken };
    }

    verifyByAccessToken(
        verifyByAccessTokenDto: VerifyByAccessTokenDto,
    ): Promise<UserIdImpl> {
        throw new Error('Method not implemented.');
    }

    cryptPassword(
        cryptPasswordDto: CryptPasswordDto,
    ): Promise<CryptedPasswordImpl> {
        throw new Error('Method not implemented.');
    }
}
