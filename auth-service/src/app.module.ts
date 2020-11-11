import { Module } from '@nestjs/common';
import { configModule } from './configure.root';
import { TokenModule } from './token/token.module';

@Module({
  imports: [TokenModule, configModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
