import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
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
    const user: basicProfileDto = await this.userService.getUserById(userId);
    return {
      email: user.email,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      picture: user.picture || '',
      locale: user.locale || '',
    };
  }

  @Put('update')
  async updateUserProfile(
    @Body() body: any,
    @Request() req: any,
  ): Promise<basicProfileDto> {
    const userId = req.user.id;
    const user = {
      firstName: body.firstName,
      lastName: body.lastName,
      picture: body.picture,
      locale: body.locale,
    };

    const responseUser: any = await this.userService.updateUser(userId, user);

    return {
      email: responseUser.email,
      firstName: responseUser.firstName || '',
      lastName: responseUser.lastName || '',
      picture: responseUser.picture || '',
      locale: responseUser.locale || '',
    };
  }

  // Rest of the controller code...
}
