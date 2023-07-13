import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleController } from './sso/google/google.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserDbModule } from 'src/user-db/user-db.module';

@Module({
  imports: [
    UserDbModule,
    PassportModule, // Add this
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Replace with your own secret key
      signOptions: { expiresIn: '24h' }, // Set the token expiration time
    }),
  ],
  providers: [AuthService, JwtStrategy], // Add JwtStrategy
  controllers: [AuthController, GoogleController],
  exports: [JwtStrategy, PassportModule], // Export JwtStrategy and PassportModule
})
export class AuthModule {}
