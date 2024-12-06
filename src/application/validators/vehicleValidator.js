const Joi = require('joi');

const vehicleSchema = Joi.object({
  vehicleType: Joi.string().required(),
  loadCapacity: Joi.number().positive().required(),
  licensePlate: Joi.string().pattern(/^[A-Z0-9]{6,10}$/).required(),
  operatingCompany: Joi.string().required()
});

module.exports = vehicleSchema;