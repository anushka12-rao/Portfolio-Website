import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

export const verifyCredentials = async (email, password) => {
  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return null;

  return user;
};

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
