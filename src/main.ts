import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // replace with your frontend domain
    credentials: true,
  });
  await app.listen(process.env.PORT, '0.0.0.0');
}
bootstrap();
