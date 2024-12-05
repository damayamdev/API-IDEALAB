const Joi = require('joi');

const vehicleSchema = Joi.object({
  vehicleType: Joi.string().required(),
  loadCapacity: Joi.number().default(0).min(0),
  licensePlate: Joi.string().pattern(/^[A-Z0-9]{6,10}$/).required(),
  operatingCompany: Joi.string()
});

module.exports = vehicleSchema;