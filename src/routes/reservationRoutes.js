import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import {
  getReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation
} from '../controllers/reservationController.js';

const router = Router({ mergeParams: true });

router.get('/', auth(), getReservations);
router.get('/:idReservation', auth(), getReservation);
router.post('/', auth(), createReservation);
router.put('/:idReservation', auth(), updateReservation);
router.delete('/:idReservation', auth('admin'), deleteReservation);

export default router;