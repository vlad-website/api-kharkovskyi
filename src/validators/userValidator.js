import Joi from 'joi';

export const userCreateSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('admin', 'staff').default('staff')
});

export const userUpdateSchema = Joi.object({
  username: Joi.string().min(3),
  password: Joi.string().min(6),
  role: Joi.string().valid('admin', 'staff')
});