import { Injectable } from '@nestjs/common';
import { CryptPasswordDto } from './dto/crypt-password.dto';
import { GenerateTokensDto } from './dto/generate-token.dto';
import { VerifyByAccessTokenDto } from './dto/verify-by-acess-token,dto';
import { CryptedPasswordImpl } from './interfaces/crypted-password.interface';
import { TokensImpl } from './interfaces/tokens.interface';
import { UserIdImpl } from './interfaces/user.interface';

@Injectable()
export class TokenService {
    
    generateTokens(generateTokensDto: GenerateTokensDto): Promise<TokensImpl> {
        throw new Error('Method not implemented.');
    }

    verifyByAccessToken(verifyByAccessTokenDto: VerifyByAccessTokenDto): Promise<UserIdImpl> {
        throw new Error('Method not implemented.');
    }

    cryptPassword(cryptPasswordDto: CryptPasswordDto): Promise<CryptedPasswordImpl> {
        throw new Error('Method not implemented.');
    }
}
