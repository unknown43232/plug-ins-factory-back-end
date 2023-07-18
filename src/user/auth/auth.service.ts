import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';
import { User, UserDocument } from 'src/models/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    try {
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
    } catch (error) {
      throw new InternalServerErrorException('Error registering the user');
    }
  }

  async login(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.findOne(createUserDto.email);
      if (
        !user ||
        !(await this.validatePassword(createUserDto.password, user.password))
      ) {
        throw new UnauthorizedException('Invalid username or password');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error logging in');
    }
  }

  async findOne(email: string): Promise<User> {
    try {
      return this.userModel.findOne({ email });
    } catch (error) {
      throw new InternalServerErrorException('Error finding the user');
    }
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return bcrypt.compare(password, hashedPassword);
    } catch (error) {
      throw new InternalServerErrorException('Error validating password');
    }
  }

  generateToken(user: User): string {
    try {
      const payload = { email: user.email, sub: user.id };
      return this.jwtService.sign(payload);
    } catch (error) {
      throw new InternalServerErrorException('Error generating token');
    }
  }
}
