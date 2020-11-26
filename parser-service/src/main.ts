import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const logger = new Logger(bootstrap.name);

    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT);

    logger.log('Parser service is started!');
}
bootstrap();
