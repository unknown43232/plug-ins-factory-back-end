import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Request,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginResponse } from 'interfaces/login-response.interface';
import { JwtAuthGuard } from 'src/middlewares/jwt-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const user = await this.authService.register(createUserDto);
      const token = await this.authService.generateToken(user);

      await res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // One week from now
        secure: true,
      });
      res.json({
        message: 'User registered successfully',
        email: user.email,
      });
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

  @UseGuards(JwtAuthGuard)
  @Get('isAuthenticated')
  isAuthenticated(@Request() req) {
    if (req.user) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }
  @Post('logout')
  signOut(@Res() res: Response): void {
    res.clearCookie('token', { path: '/' });
    res.json({ message: 'Successfully signed out' });
  }

  @Post('login')
  async login(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const user = await this.authService.login(createUserDto);
      const token = await this.authService.generateToken(user);

      await res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // One week from now
        secure: true,
      });
      res.json({
        message: 'User logged in successfully',
        email: user.email,
      });
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
