import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { config } from '../config.js';
import { userCreateSchema, userUpdateSchema } from '../validators/userValidator.js';

/** @desc Register new user (admin or staff) */
export async function register(req, res, next) {
  try {
    const { error, value } = userCreateSchema.validate(req.body);
    if (error) return res.status(400).json({ error: { message: error.message } });

    const existing = await User.findOne({ email: value.email });
    if (existing) return res.status(409).json({ error: { message: 'Email already registered' } });

    const hashed = await bcrypt.hash(value.password, 10);
    const user = await User.create({ ...value, password: hashed });
    res.status(201).json({ message: 'User created', user: { username: user.username, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
}

/** @desc Get all users (admin only) */
export async function getAllUsers(req, res, next) {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    next(err);
  }
}

/** @desc Get one user by email */
export async function getUser(req, res, next) {
  try {
    const user = await User.findOne({ email: req.params.email }).select('-password');
    if (!user) return res.status(404).json({ error: { message: 'User not found' } });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

/** @desc Update user (by email) */
export async function updateUser(req, res, next) {
  try {
    const { error, value } = userUpdateSchema.validate(req.body);
    if (error) return res.status(400).json({ error: { message: error.message } });

    if (value.password) {
      value.password = await bcrypt.hash(value.password, 10);
    }

    const user = await User.findOneAndUpdate({ email: req.params.email }, value, { new: true }).select('-password');
    if (!user) return res.status(404).json({ error: { message: 'User not found' } });
    res.json({ message: 'User updated', user });
  } catch (err) {
    next(err);
  }
}

/** @desc Delete user */
export async function deleteUser(req, res, next) {
  try {
    const user = await User.findOneAndDelete({ email: req.params.email });
    if (!user) return res.status(404).json({ error: { message: 'User not found' } });
    res.json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
}

/** @desc Login user */
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: { message: 'Invalid credentials' } });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: { message: 'Invalid credentials' } });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    res.json({ message: 'Login successful', token });
  } catch (err) {
    next(err);
  }
}

/** @desc Logout (frontend just deletes token) */
export async function logout(req, res) {
  res.json({ message: 'Logout successful (delete token client-side)' });
}