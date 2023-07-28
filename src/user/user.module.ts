import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthController } from './auth/auth.controller';
import { GoogleController } from './auth/sso/google/google.controller';
import { AuthService } from './auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../models/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './auth/sso/google/google.strategy';
import { JwtStrategy } from 'src/middlewares/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  providers: [UserService, AuthService, JwtStrategy, GoogleStrategy],
  controllers: [UserController, AuthController, GoogleController],
  exports: [UserService],
})
export class UserModule {}
