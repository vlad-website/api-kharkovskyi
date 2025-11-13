import { Catway } from '../models/Catway.js';
import { catwayCreateSchema, catwayUpdateSchema } from '../validators/catwayValidator.js';

/** @desc Get all catways */
export async function getAllCatways(req, res, next) {
  try {
    const catways = await Catway.find().sort('catwayNumber');
    res.json(catways);
  } catch (err) {
    next(err);
  }
}

/** @desc Get one catway by ID (catwayNumber) */
export async function getCatway(req, res, next) {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    if (!catway) return res.status(404).json({ error: { message: 'Catway not found' } });
    res.json(catway);
  } catch (err) {
    next(err);
  }
}

/** @desc Create new catway */
export async function createCatway(req, res, next) {
  try {
    const { error, value } = catwayCreateSchema.validate(req.body);
    if (error) return res.status(400).json({ error: { message: error.message } });

    const existing = await Catway.findOne({ catwayNumber: value.catwayNumber });
    if (existing) return res.status(409).json({ error: { message: 'Catway already exists' } });

    const catway = await Catway.create(value);
    res.status(201).json(catway);
  } catch (err) {
    next(err);
  }
}

/** @desc Update catway state (not number/type) */
export async function updateCatway(req, res, next) {
  try {
    const { error, value } = catwayUpdateSchema.validate(req.body);
    if (error) return res.status(400).json({ error: { message: error.message } });

    const catway = await Catway.findOneAndUpdate(
      { catwayNumber: req.params.id },
      { catwayState: value.catwayState },
      { new: true }
    );
    if (!catway) return res.status(404).json({ error: { message: 'Catway not found' } });
    res.json({ message: 'Catway updated', catway });
  } catch (err) {
    next(err);
  }
}

/** @desc Delete catway */
export async function deleteCatway(req, res, next) {
  try {
    const catway = await Catway.findOneAndDelete({ catwayNumber: req.params.id });
    if (!catway) return res.status(404).json({ error: { message: 'Catway not found' } });
    res.json({ message: 'Catway deleted' });
  } catch (err) {
    next(err);
  }
}