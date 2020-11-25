import {
    CACHE_MANAGER,
    Inject,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserServiceImpl } from './interfaces/user-service.interface';
import { JwtPayload } from './jwt-payload.interface';
import { UserIdImpl } from './interfaces/user-id.interface';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh-strategy',
) {
    private logger = new Logger(RefreshJwtStrategy.name);

    private userService: UserServiceImpl;

    constructor(
        @Inject(CACHE_MANAGER) private refreshTokensManager: Cache,
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('ACCESS_JWT_SECRET'),
        });
    }

    async validate(payload: JwtPayload): Promise<UserIdImpl> {
        const { id } = payload;
        const user = await this.userService.getUserById({ id }).toPromise();
        if (!user) {
            throw new UnauthorizedException();
        }

        return { id };
    }
}
