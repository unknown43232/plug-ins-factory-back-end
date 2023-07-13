// user.schema.ts
import { Document, Schema } from 'mongoose';

export const UserSchema = new Schema({
  googleId: String,
  email: String,
  firstName: String,
  lastName: String,
  picture: String,
  locale: String,
  password: String,
});

export interface User {
  id: string;
  googleId: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  locale: string;
  password: string;
}

export type UserDocument = User & Document;
