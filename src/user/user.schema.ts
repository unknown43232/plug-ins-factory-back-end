import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  googleId: String,
  email: String,
  firstName: String,
  lastName: String,
  picture: String,
  locale: String,
  password: String,
});
