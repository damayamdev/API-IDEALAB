const ResponseHandler = require('../../shared/response/ResponseHandler');
const vehicleSchema = require('../../application/validators/vehicleValidator');

class VehicleController {
  constructor({ vehicleService }) {
    this.vehicleService = vehicleService;
  }

  async getAllVehicles(req, res) {
    try {
      const vehicles = await this.vehicleService.getAllVehicles();
      return ResponseHandler.success(res, vehicles);
    } catch (error) {
      return ResponseHandler.error(res, error.message);
    }
  }

  async getVehicleById(req, res) {
    try {
      const vehicle = await this.vehicleService.getVehicleById(req.params.id);
      return ResponseHandler.success(res, vehicle);
    } catch (error) {
      if (error.message === 'Vehicle not found') {
        return ResponseHandler.notFound(res, error.message);
      }
      return ResponseHandler.error(res, error.message);
    }
  }

  async createVehicle(req, res) {
    try {
      const { error } = vehicleSchema.validate(req.body);
      if (error) {
        return ResponseHandler.badRequest(res, 'Validation error', error.details);
      }

      const id = await this.vehicleService.createVehicle(req.body);
      return ResponseHandler.created(res, { id, ...req.body });
    } catch (error) {
      return ResponseHandler.error(res, error.message);
    }
  }

  async updateVehicle(req, res) {
    try {
      const { error } = vehicleSchema.validate(req.body);
      if (error) {
        return ResponseHandler.badRequest(res, 'Validation error', error.details);
      }

      const vehicle = await this.vehicleService.updateVehicle(req.params.id, req.body);
      return ResponseHandler.success(res, vehicle);
    } catch (error) {
      if (error.message === 'Vehicle not found') {
        return ResponseHandler.notFound(res, error.message);
      }
      return ResponseHandler.error(res, error.message);
    }
  }

  async deleteVehicle(req, res) {
    try {
      await this.vehicleService.deleteVehicle(req.params.id);
      return ResponseHandler.success(res, null, 'Vehicle deleted successfully');
    } catch (error) {
      if (error.message === 'Vehicle not found') {
        return ResponseHandler.notFound(res, error.message);
      }
      return ResponseHandler.error(res, error.message);
    }
  }
}

module.exports = VehicleController;