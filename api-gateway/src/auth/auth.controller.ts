import {  Body, Controller, Post, ValidationPipe, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { TokensImpl } from './interfaces/tokens.interface';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private readonly authService: AuthService) {}

    @Post('/signIn')
    async signIn(@Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDto): Promise<TokensImpl> {
        return this.authService.signIn(authCredentialsDTO);
    }

    @Post('/signUp')
    async signUp(@Body(ValidationPipe) signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
        this.logger.log(`Sign up with data: ${JSON.stringify(signUpCredentialsDto)}`);

        return this.authService.signUp(signUpCredentialsDto);
    }
}
