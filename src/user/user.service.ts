import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user-db/user.schema';
import { basicProfileDto } from './basic-profile.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async getUserById(userId: string): Promise<basicProfileDto | null> {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      return null;
    }

    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      picture: user.picture,
      locale: user.locale,
    };
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async createUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }
  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async updateUser(userId: string, user: Partial<User>): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(userId, user, { new: true }).exec();
  }

  async deleteUser(userId: string): Promise<User | null> {
    return this.userModel.findByIdAndRemove(userId).exec();
  }
}
