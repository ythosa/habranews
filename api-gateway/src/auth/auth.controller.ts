import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { TokensImpl } from './interfaces/tokens.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signIn')
    async signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<TokensImpl> {
        return
    }

    @Post('/signUp')
    async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
        return
    }
}
