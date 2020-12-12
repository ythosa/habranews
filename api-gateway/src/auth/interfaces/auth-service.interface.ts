import { GenerateTokensDto } from '../dto/generate-token.dto';
import { RegenerateTokensDto } from '../dto/regenerate-tokens.dto';
import { CryptPasswordDtoImpl } from './crypt-password-dto.interface';
import { CryptedPasswordImpl } from './crypted-password.interface';
import { TokensImpl } from './tokens.interface';

export interface AuthServiceImpl {
    generate(generateTokensDto: GenerateTokensDto): Promise<TokensImpl>;
    regenerate(regenerateTokensDto: RegenerateTokensDto): Promise<TokensImpl>;
    cryptPassword(
        cryptPasswordDto: CryptPasswordDtoImpl,
    ): Promise<CryptedPasswordImpl>;
}
