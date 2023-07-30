import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:4200',
      'pluginsfactory.com',
      'timely-dolphin-db3d1b.netlify.app',
      'https://timely-dolphin-db3d1b.netlify.app/',
    ], // replace with your frontend domain
    credentials: true,
  });
  await app.listen(process.env.PORT, '0.0.0.0');
}
bootstrap();
