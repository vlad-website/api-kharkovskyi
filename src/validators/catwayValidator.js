import Joi from 'joi';

export const catwayCreateSchema = Joi.object({
  catwayNumber: Joi.number().integer().min(1).required(),
  catwayType: Joi.string().valid('short', 'long').required(),
  catwayState: Joi.string().min(3).required()
});

export const catwayUpdateSchema = Joi.object({
  catwayState: Joi.string().min(3).required()
});