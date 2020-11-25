import { CacheModule, Module } from '@nestjs/common';
import { join, resolve } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import * as redisStore from 'cache-manager-redis-store';

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
        CacheModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                store: redisStore,
                host: configService.get<string>('TOKENSDB_HOST'),
                port: configService.get<string>('TOKENSDB_PORT'),
            }),
            inject: [ConfigService],
        }),
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        JwtModule.register({}),
    ],
    providers: [TokenService],
    controllers: [TokenController],
})
export class TokenModule {}
