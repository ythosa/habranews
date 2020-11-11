import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { join, resolve } from 'path';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const logger = new Logger(bootstrap.name);

    const app = await NestFactory.createMicroservice(
        AppModule,
        {
            transport: Transport.GRPC,
            options: {
                package: 'user',
                protoPath: join(
                    resolve(process.cwd(), '..'),
                    'protobufs/auth-service/auth.proto',
                ),
                url: `0.0.0.0:${process.env.PORT}`,
            },
        },
    );

    await app.listen(() => logger.log('User Service is started!'));
}
bootstrap();
