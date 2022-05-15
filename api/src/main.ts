import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const dotenv = require('dotenv');


async function bootstrap() {
  dotenv.config()
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);
}
bootstrap();