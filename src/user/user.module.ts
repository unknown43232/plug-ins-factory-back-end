import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthController } from './auth/auth.controller';
import { GoogleController } from './auth/sso/google/google.controller';
import { AuthService } from './auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [JwtService, UserService, AuthService],
  controllers: [UserController, AuthController, GoogleController],
  exports: [UserService],
})
export class UserModule {}
