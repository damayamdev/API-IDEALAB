const VehicleService = require('../../application/services/VehicleService');
const vehicleSchema = require('../../application/validators/vehicleValidator');

class VehicleController {
  constructor(vehicleRepository) {
    this.vehicleService = new VehicleService(vehicleRepository);
  }

  async getAllVehicles(req, res) {
    try {
      const vehicles = await this.vehicleService.getAllVehicles();
      res.json(vehicles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getVehicleById(req, res) {
    try {
      const vehicle = await this.vehicleService.getVehicleById(req.params.id);
      res.json(vehicle);
    } catch (error) {
      if (error.message === 'Vehicle not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async createVehicle(req, res) {
    try {
      const { error } = vehicleSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const id = await this.vehicleService.createVehicle(req.body);
      res.status(201).json({ id, ...req.body });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateVehicle(req, res) {
    try {
      const { error } = vehicleSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const vehicle = await this.vehicleService.updateVehicle(req.params.id, req.body);
      res.json(vehicle);
    } catch (error) {
      if (error.message === 'Vehicle not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async deleteVehicle(req, res) {
    try {
      await this.vehicleService.deleteVehicle(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error.message === 'Vehicle not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = VehicleController;