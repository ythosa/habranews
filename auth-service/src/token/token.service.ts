import { Injectable } from '@nestjs/common';
import { GenerateTokensDto } from './dto/generate-token.dto';
import { ITokens } from './interfaces/tokens.interface';

@Injectable()
export class TokenService {
    generateTokens(generateTokensDto: GenerateTokensDto): Promise<ITokens> {
        throw new Error('Method not implemented.');
    }
}
