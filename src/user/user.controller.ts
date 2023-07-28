import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../middlewares/jwt-auth.guard';
import { basicProfileDto } from './dto/basic-profile.dto';
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('home')
  async getUserProfile(@Request() req: any): Promise<basicProfileDto> {
    const userId = req.user.id;
    return this.userService.getUserById(userId);
  }

  // Rest of the controller code...
}
