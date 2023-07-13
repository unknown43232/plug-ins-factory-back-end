import { Injectable } from '@nestjs/common';
import { User } from 'interfaces/user.interface';
import { UserDocument, UserModel } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getUserById(userId: string): Promise<User | null> {
    console.log(userId);
    return this.userModel.findById(userId).exec();
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async createUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async updateUser(userId: string, user: Partial<User>): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(userId, user, { new: true }).exec();
  }

  async deleteUser(userId: string): Promise<User | null> {
    return this.userModel.findByIdAndRemove(userId).exec();
  }
}
