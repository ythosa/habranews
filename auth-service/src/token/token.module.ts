import { Module } from '@nestjs/common';
import { join, resolve } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { TokenService } from './token.service';
import { TokenController } from './token.controller';

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'USER_PACKAGE',
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.GRPC,
                    options: {
                        package: 'user',
                        protoPath: join(
                            resolve(process.cwd(), '..'),
                            'protobufs/user-service/user.proto',
                        ),
                        url: configService.get<string>('USER_SERVICE_URL'),
                    },
                }),
                inject: [ConfigService],
            },
        ]),
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [TokenService],
    controllers: [TokenController],
})
export class TokenModule {}
