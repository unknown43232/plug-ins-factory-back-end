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
      // Set token as a HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: false,
        sameSite: 'none',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // One week from now
        secure: true,
      });
      // Redirect to your Angular app
      res.redirect(process.env.ORIGIN);
    } catch (error) {
      // Handle any errors that occur during the authentication process
      res.status(500).json({ message: 'Error during authentication' });
    }
  }
}
