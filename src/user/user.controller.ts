import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../middlewares/jwt-auth.guard';
import { User } from 'interfaces/user.interface';
import { log } from 'console';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUserProfile(@Request() req: any): Promise<User> {
    // console.log('take :' + JSON.stringify(req.user));
    const userId = req.user.userId;
    return this.userService.getUserById(userId);
  }

  // Rest of the controller code...
}
