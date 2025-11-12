import { Router } from 'express';
import { register, getAllUsers, getUser, updateUser, deleteUser } from '../controllers/userController.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

// Registration (public)
router.post('/', register);

// All users (admin only)
router.get('/', auth(), getAllUsers);

// User details
router.get('/:email', auth(), getUser);

// Update
router.put('/:email', auth(), updateUser);

// Delete
router.delete('/:email', auth(), deleteUser);

export default router;