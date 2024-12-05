const Vehicle = require('../../domain/entities/Vehicle');
const vehicleSchema = require('../../application/validators/vehicleValidator');

class VehicleController {
  constructor(vehicleRepository) {
    this.vehicleRepository = vehicleRepository;
  }

  async getAllVehicles(req, res) {
    try {
      const vehicles = await this.vehicleRepository.findAll();
      res.json(vehicles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getVehicleById(req, res) {
    try {
      const vehicle = await this.vehicleRepository.findById(req.params.id);
      if (!vehicle) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }
      res.json(vehicle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createVehicle(req, res) {
    try {
      const { error } = vehicleSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const vehicle = new Vehicle(
        null,
        req.body.vehicleType,
        req.body.loadCapacity,
        req.body.licensePlate,
        req.body.operatingCompany
      );

      const id = await this.vehicleRepository.create(vehicle);
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

      const vehicle = new Vehicle(
        req.params.id,
        req.body.vehicleType,
        req.body.loadCapacity,
        req.body.licensePlate,
        req.body.operatingCompany
      );

      const success = await this.vehicleRepository.update(req.params.id, vehicle);
      if (!success) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }
      res.json(vehicle);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteVehicle(req, res) {
    try {
      const success = await this.vehicleRepository.delete(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = VehicleController;