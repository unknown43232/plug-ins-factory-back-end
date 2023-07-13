import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleController } from './sso/google/google.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule, // Add this
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Replace with your own secret key
      signOptions: { expiresIn: '24h' }, // Set the token expiration time
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [AuthService, JwtStrategy], // Add JwtStrategy
  controllers: [AuthController, GoogleController],
  exports: [JwtStrategy, PassportModule], // Export JwtStrategy and PassportModule
})
export class AuthModule {}
