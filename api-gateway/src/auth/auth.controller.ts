import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // @Get('/signIn')
    // async signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<IUser> {
        
    // }
}
