import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../middlewares/jwt-auth.guard';
import { User } from 'src/user/user.schema';
import { basicProfileDto } from './dto/basic-profile.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUserProfile(@Request() req: any): Promise<basicProfileDto> {
    const userId = req.user.userId;
    return this.userService.getUserById(userId);
  }

  // Rest of the controller code...
}
