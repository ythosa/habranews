import { CryptPasswordDto } from '../dto/crypt-password.dto';
import { GenerateTokensDto } from '../dto/generate-token.dto';
import { RegenerateTokensDto } from '../dto/regenerate-tokens.dto';
import { VerifyByAccessTokenDto } from '../dto/verify-by-acess-token,dto';
import { CryptedPasswordImpl } from './crypted-password.interface';
import { TokensImpl } from './tokens.interface';
import { UserIdImpl } from './user-id.interface';

export interface AuthServiceImpl {
    generate(generateTokensDto: GenerateTokensDto): Promise<TokensImpl>;
    verifyByAccessToken(
        verifyByAccessTokenDto: VerifyByAccessTokenDto,
    ): Promise<UserIdImpl>;
    regenerate(regenerateTokensDto: RegenerateTokensDto): Promise<TokensImpl>;
    cryptPassword(
        cryptPasswordDto: CryptPasswordDto,
    ): Promise<CryptedPasswordImpl>;
}
