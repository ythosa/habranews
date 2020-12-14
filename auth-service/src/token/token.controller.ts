import { Body, Controller, Logger, UseGuards, ValidationPipe } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CryptPasswordDto } from './dto/crypt-password.dto';
import { GenerateTokensDto } from './dto/generate-token.dto';
import { RegenerateTokensDto } from './dto/regenerate-tokens.dto';
import { VerifyByAccessTokenDto } from './dto/verify-by-access-token.dto';
import { CryptedPasswordImpl } from './interfaces/crypted-password.interface';
import { AuthServiceImpl } from './interfaces/auth-service.interface';
import { TokensImpl } from './interfaces/tokens.interface';
import { UserIdImpl } from './interfaces/user-id.interface';
import { TokenService } from './token.service';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@Controller('token')
export class TokenController implements AuthServiceImpl {
    private logger = new Logger(TokenController.name);

    constructor(private readonly tokenService: TokenService) {}

    @GrpcMethod('AuthService')
    async generate(@Body(ValidationPipe) generateTokensDto: GenerateTokensDto): Promise<TokensImpl> {
        this.logger.log(
            `Generation tokens with data: ${JSON.stringify(generateTokensDto)}`,
        );

        return this.tokenService.generateTokens(generateTokensDto);
    }

    @GrpcMethod('AuthService')
    @UseGuards(RefreshTokenGuard)
    async regenerate(
        regenerateTokensDto: RegenerateTokensDto,
    ): Promise<TokensImpl> {
        this.logger.log(
            `Regenerating tokens by refresh token with data: ${JSON.stringify(
                regenerateTokensDto,
            )}`,
        );

        return this.tokenService.regenerateTokens(regenerateTokensDto);
    }

    @GrpcMethod('AuthService')
    async verifyByAccessToken(
        verifyByAccessTokenDto: VerifyByAccessTokenDto,
    ): Promise<UserIdImpl> {
        this.logger.log(
            `Verifying by access token with data: ${JSON.stringify(
                verifyByAccessTokenDto,
            )}`,
        );

        return this.tokenService.verifyByAccessToken(verifyByAccessTokenDto);
    }

    @GrpcMethod('AuthService')
    async cryptPassword(
        cryptPasswordDto: CryptPasswordDto,
    ): Promise<CryptedPasswordImpl> {
        this.logger.log(
            `Crypting password with data: ${JSON.stringify(cryptPasswordDto)}`,
        );

        return this.tokenService.cryptPassword(cryptPasswordDto);
    }
}
