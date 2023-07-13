// user.model.ts
import { User } from 'interfaces/user.interface';
import { model, Document } from 'mongoose';
import { UserSchema } from './user.schema';

export type UserDocument = User & Document;

export const UserModel = model<UserDocument>('User', UserSchema);
