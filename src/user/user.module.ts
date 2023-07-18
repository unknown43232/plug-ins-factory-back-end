import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthController } from './auth/auth.controller';
import { GoogleController } from './auth/sso/google/google.controller';
import { AuthService } from './auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UserService, AuthService],
  controllers: [UserController, AuthController, GoogleController],
  exports: [UserService],
})
export class UserModule {}
