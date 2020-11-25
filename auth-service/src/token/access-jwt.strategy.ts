import {
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
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt-access-strategy',
) {
    private logger = new Logger(JwtStrategy.name);

    private userService: UserServiceImpl;

    constructor(
        @Inject('USER_PACKAGE') private client: ClientGrpc,
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    onModuleInit() {
        this.userService = this.client.getService<UserServiceImpl>(
            'UserService',
        );
    }

    async validate(payload: JwtPayload): Promise<UserIdImpl> {
        const { id } = payload;
        const user = this.userService.getUserById({ id });
        if (!user) {
            throw new UnauthorizedException();
        }

        return { id };
    }
}
