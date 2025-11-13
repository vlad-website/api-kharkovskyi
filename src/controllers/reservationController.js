import { Reservation } from '../models/Reservation.js';
import { Catway } from '../models/Catway.js';
import { reservationCreateSchema, reservationUpdateSchema } from '../validators/reservationValidator.js';

/** @desc List reservations for a catway */
export async function getReservations(req, res, next) {
  try {
    const list = await Reservation.find({ catwayNumber: req.params.id });
    res.json(list);
  } catch (err) {
    next(err);
  }
}

/** @desc Get one reservation */
export async function getReservation(req, res, next) {
  try {
    const resv = await Reservation.findById(req.params.idReservation);
    if (!resv) return res.status(404).json({ error: { message: 'Reservation not found' } });
    res.json(resv);
  } catch (err) {
    next(err);
  }
}

/** @desc Create reservation */
export async function createReservation(req, res, next) {
  try {
    // Добавляем catwayNumber из URL внутрь тела до валидации
    const bodyWithCatway = { ...req.body, catwayNumber: Number(req.params.id) };

    // Валидируем уже полный объект
    const { error, value } = reservationCreateSchema.validate(bodyWithCatway);
    if (error) return res.status(400).json({ error: { message: error.message } });

    // Проверяем, что catway существует и доступен
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    if (!catway) return res.status(404).json({ error: { message: 'Catway not found' } });

    // Проверяем, не в ремонте ли
    if (/réparation|ne peut|non disponible/i.test(catway.catwayState)) {
      return res.status(400).json({ error: { message: 'Catway currently unavailable' } });
    }

    // Проверяем пересечение дат
    const overlap = await Reservation.findOne({
      catwayNumber: req.params.id,
      $or: [
        { startDate: { $lte: value.endDate }, endDate: { $gte: value.startDate } }
      ]
    });
    if (overlap) return res.status(409).json({ error: { message: 'Dates overlap with existing reservation' } });

    // Создаём бронирование
    const newResv = await Reservation.create(value);
    res.status(201).json(newResv);
  } catch (err) {
    next(err);
  }
}

/** @desc Update reservation */
export async function updateReservation(req, res, next) {
  try {
    const { error, value } = reservationUpdateSchema.validate(req.body);
    if (error) return res.status(400).json({ error: { message: error.message } });

    const resv = await Reservation.findByIdAndUpdate(req.params.idReservation, value, { new: true });
    if (!resv) return res.status(404).json({ error: { message: 'Reservation not found' } });
    res.json({ message: 'Reservation updated', resv });
  } catch (err) {
    next(err);
  }
}

/** @desc Delete reservation */
export async function deleteReservation(req, res, next) {
  try {
    const resv = await Reservation.findByIdAndDelete(req.params.idReservation);
    if (!resv) return res.status(404).json({ error: { message: 'Reservation not found' } });
    res.json({ message: 'Reservation deleted' });
  } catch (err) {
    next(err);
  }
}