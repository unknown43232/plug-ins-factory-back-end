import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service'; // Make sure to import AppService
import { UserDbModule } from './user-db/user-db.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    UserDbModule,
  ],
  controllers: [AppController],
  providers: [AppService], // Add AppService to the providers array
})
export class AppModule {}
