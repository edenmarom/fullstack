import mongoose from 'mongoose';

const UserSchema= new mongoose.Schema({
  userName: String,
  password: String,
  mail: String
});

export const UserModel = mongoose.model('User', UserSchema);
