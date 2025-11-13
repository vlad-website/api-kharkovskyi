import { Router } from 'express';
import { auth } from './middlewares/auth.js';
import { Reservation } from './models/Reservation.js';

const router = Router();

// Page d'accueil
router.get('/', (req, res) => {
  res.render('index', { title: 'Accueil' });
});

// Page documentation API
router.get('/docs', (req, res) => {
  res.render('docs', { title: 'Documentation' });
});

// Tableau de bord (protégé)
router.get('/dashboard', auth(), async (req, res, next) => {
  try {
    const reservations = await Reservation.find();
    res.render('dashboard', {
      title: 'Tableau de bord',
      user: req.user,
      reservations
    });
  } catch (err) {
    next(err);
  }
});

export default router;