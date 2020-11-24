import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CryptPasswordDto } from './dto/crypt-password.dto';
import { GenerateTokensDto } from './dto/generate-token.dto';
import { VerifyByAccessTokenDto } from './dto/verify-by-acess-token,dto';
import { CryptedPasswordImpl } from './interfaces/crypted-password.interface';
import { TokensImpl } from './interfaces/tokens.interface';
import { UserIdImpl } from './interfaces/user-id.interface';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
    private logger = new Logger(TokenController.name);

    constructor(private readonly tokenService: TokenService) {}

    @GrpcMethod('AuthService')
    async generate(generateTokensDto: GenerateTokensDto): Promise<TokensImpl> {
        this.logger.log(
            `Generation tokens with data: ${JSON.stringify(generateTokensDto)}`,
        );

        return this.tokenService.generateTokens(generateTokensDto);
    }

    @GrpcMethod('AuthService')
    async verifyByAccessToken(verifyByAccessTokenDto: VerifyByAccessTokenDto): Promise<UserIdImpl> {
        this.logger.log(
            `Verifying by access token with data: ${JSON.stringify(verifyByAccessTokenDto)}`,
        );

        return this.tokenService.verifyByAccessToken(verifyByAccessTokenDto);
    }

    @GrpcMethod('AuthService')
    async cryptPassword(cryptPasswordDto: CryptPasswordDto): Promise<CryptedPasswordImpl> {
        this.logger.log(
            `Crypting password with data: ${JSON.stringify(cryptPasswordDto)}`,
        );

        return this.tokenService.cryptPassword(cryptPasswordDto);
    }
}
