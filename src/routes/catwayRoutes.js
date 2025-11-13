import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import {
  getAllCatways,
  getCatway,
  createCatway,
  updateCatway,
  deleteCatway
} from '../controllers/catwayController.js';
import reservationRoutes from './reservationRoutes.js';

const router = Router();

router.get('/', auth(), getAllCatways);
router.get('/:id', auth(), getCatway);
router.post('/', auth('admin'), createCatway);
router.put('/:id', auth(), updateCatway);
router.delete('/:id', auth('admin'), deleteCatway);

// nested routes for reservations
router.use('/:id/reservations', reservationRoutes);

export default router;