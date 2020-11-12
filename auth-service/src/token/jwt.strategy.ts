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
import { IUserService } from './interfaces/user-service.interface';
import { JwtPayload } from './jwt-payload.interface';
import { Observable } from 'rxjs';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private logger = new Logger(JwtStrategy.name);

    private userService: IUserService;

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
        this.userService = this.client.getService<IUserService>('UserService');
    }

    async validate(payload: JwtPayload): Promise<Observable<IUser>> {
        const { id } = payload;
        const user = this.userService.getUserById({ id });
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
