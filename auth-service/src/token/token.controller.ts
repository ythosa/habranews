import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GenerateTokenDto } from './dto/generate-token.dto';
import { ITokens } from './interfaces/tokens.interface';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
    private logger = new Logger(TokenController.name);

    constructor(private readonly tokenService: TokenService) {}

    @GrpcMethod('AuthService')
    async generate(generateTokensDto: GenerateTokenDto): Promise<ITokens> {
        this.logger.log(
            `Generation tokens with data: ${JSON.stringify(generateTokensDto)}`,
        );

        return this.tokenService.generateTokens(generateTokensDto);
    }
}
