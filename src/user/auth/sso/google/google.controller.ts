import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from '../../auth.service';

@Controller('auth/google')
export class GoogleController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    // The user will be redirected to the Google authentication page
  }

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req, @Res() res: Response): Promise<void> {
    try {
      const user = req.user;
      const token = this.authService.generateToken(user);
      res.json({
        message: 'User authenticated successfully',
        token: token,
      });
    } catch (error) {
      // Handle any errors that occur during the authentication process
      res.status(500).json({ message: 'Error during authentication' });
    }
  }
}
