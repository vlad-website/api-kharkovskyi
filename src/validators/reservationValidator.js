import Joi from 'joi';

export const reservationCreateSchema = Joi.object({
  catwayNumber: Joi.number().integer().min(1).required(),
  clientName: Joi.string().min(3).required(),
  boatName: Joi.string().min(2).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref('startDate')).required()
});

export const reservationUpdateSchema = Joi.object({
  clientName: Joi.string().min(3),
  boatName: Joi.string().min(2),
  startDate: Joi.date(),
  endDate: Joi.date().greater(Joi.ref('startDate'))
});