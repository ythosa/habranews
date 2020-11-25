import { GenerateTokensDto } from '../dto/generate-token.dto';
import { RegenerateTokensDto } from '../dto/regenerate-tokens.dto';
import { TokensImpl } from './tokens.interface';

export interface AuthServiceImpl {
    generate(generateTokensDto: GenerateTokensDto): Promise<TokensImpl>;
    regenerate(regenerateTokensDto: RegenerateTokensDto): Promise<TokensImpl>;
}
