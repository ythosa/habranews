import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
    const logger = new Logger(bootstrap.name);

    const app = await NestFactory.create(AppModule);
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    await app.listen(process.env.PORT);

    logger.log('Api Gateway is started!');
}
bootstrap();
