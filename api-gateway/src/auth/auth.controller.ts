import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { TokensImpl } from './interfaces/tokens.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signIn')
    async signIn(authCredentialsDTO: AuthCredentialsDto): Promise<TokensImpl> {
        return this.authService.signIn(authCredentialsDTO);
    }

    @Post('/signUp')
    async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
        return this.authService.signUp(signUpCredentialsDto);
    }
}
