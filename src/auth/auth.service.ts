import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from 'src/user-db/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    // Validate the user data
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      email,
      password: hashedPassword,
    });

    return newUser.save();
  }

  async login(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findOne(createUserDto.email);
    if (
      !user ||
      !(await this.validatePassword(createUserDto.password, user.password))
    ) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return user;
  }

  async findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
