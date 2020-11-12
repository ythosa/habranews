import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GenerateTokensDto } from './dto/generate-token.dto';
import { ITokens } from './interfaces/tokens.interface';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
    private logger = new Logger(TokenController.name);

    constructor(private readonly tokenService: TokenService) {}

    @GrpcMethod('AuthService')
    async generate(generateTokensDto: GenerateTokensDto): Promise<ITokens> {
        this.logger.log(
            `Generation tokens with data: ${JSON.stringify(generateTokensDto)}`,
        );

        return this.tokenService.generateTokens(generateTokensDto);
    }
}
