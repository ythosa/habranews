import { Observable } from 'rxjs';
import { GenerateTokensDto } from '../dto/generate-token.dto';
import { RegenerateTokensDto } from '../dto/regenerate-tokens.dto';
import { CryptPasswordDtoImpl } from './crypt-password-dto.interface';
import { CryptedPasswordImpl } from './crypted-password.interface';
import { TokensImpl } from './tokens.interface';

export interface AuthServiceImpl {
    generate(generateTokensDto: GenerateTokensDto): Observable<TokensImpl>;
    regenerate(
        regenerateTokensDto: RegenerateTokensDto,
    ): Observable<TokensImpl>;
    cryptPassword(
        cryptPasswordDto: CryptPasswordDtoImpl,
    ): Observable<CryptedPasswordImpl>;
}
