import { Controller, Get, UseGuards, Req, Res, Redirect } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth/google')
export class GoogleController {
  @Get()
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    // This
  }

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  @Redirect('/dashboard') // Redirect to the dashboard or desired URL after successful Google authentication
  async googleLoginCallback(@Req() req, @Res() res) {
    // This method will not have any explicit implementation as the passport-google-oauth20 strategy handles the callback internally
    // The @Redirect decorator will handle the redirection after successful authentication
  }
}
