const Joi = require('joi');

const userValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  // Add validation rules for other fields as needed
});

module.exports = {
  userValidationSchema,
};