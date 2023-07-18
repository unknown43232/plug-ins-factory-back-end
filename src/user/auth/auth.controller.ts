import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginResponse } from 'interfaces/login-response.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.authService.register(createUserDto);

      return {
        message: 'User registered successfully',
        user: user.email,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error registering user',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto): Promise<LoginResponse> {
    try {
      const user = await this.authService.login(createUserDto);
      const token = this.authService.generateToken(user);

      // You can customize the response based on your requirements
      return {
        message: 'User logged in successfully',
        email: user.email,
        token: token,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Error logging in',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
