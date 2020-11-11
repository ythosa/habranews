import { Injectable } from '@nestjs/common';
import { GenerateTokenDto } from './dto/generate-token.dto';
import { ITokens } from './interfaces/tokens.interface';

@Injectable()
export class TokenService {
    generateTokens(generateTokensDto: GenerateTokenDto): Promise<ITokens> {
        throw new Error('Method not implemented.');
    }
}
