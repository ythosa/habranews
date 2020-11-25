import {
    CACHE_MANAGER,
    CanActivate,
    ExecutionContext,
    Inject,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

export class RefreshTokenGuard implements CanActivate {
    constructor(
        @Inject(CACHE_MANAGER) private refreshTokensManager: Cache,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requestData = context.switchToRpc().getData();
        const refreshToken = requestData.refreshToken;

        let payload: JwtPayload;
        try {
            payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get<string>('REFRESH_JWT_SECRET'),
            });
        } catch (e) {
            return false;
        }

        const storedToken = await this.refreshTokensManager.get(
            payload.id.toString(),
        );
        if (storedToken != refreshToken) {
            return false;
        }

        return true;
    }
}
