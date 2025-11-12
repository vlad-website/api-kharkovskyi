import mongoose from 'mongoose';

/**
 * User model - capitainerie staff/admin
 * @typedef {Object} User
 * @property {string} username
 * @property {string} email
 * @property {string} password (hashed)
 * @property {string} role (admin|staff)
 */

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    role: {
      type: String,
      enum: ['admin', 'staff'],
      default: 'staff'
    }
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);