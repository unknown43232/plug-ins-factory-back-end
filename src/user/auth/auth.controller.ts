import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginResponse } from 'interfaces/login-response.interface';
import { User } from 'src/user/user.schema';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.register(createUserDto);

    // You can customize the response based on your requirements
    return {
      message: 'User registered successfully',
      user: user.email,
    };
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto): Promise<LoginResponse> {
    const user = await this.authService.login(createUserDto);
    const token = this.generateToken(user);
    // You can customize the response based on your requirements
    return {
      message: 'User logged in successfully',
      email: user.email,
      token: token,
    };
  }
  private generateToken(user: User): string {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
