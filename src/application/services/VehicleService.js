const Vehicle = require('../../domain/entities/Vehicle');

class VehicleService {
  constructor({vehicleRepository}) {
    this.vehicleRepository = vehicleRepository;
  }

  async getAllVehicles() {
    return await this.vehicleRepository.findAll();
  }

  async getVehicleById(id) {
    const vehicle = await this.vehicleRepository.findById(id);
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }
    return vehicle;
  }

  async createVehicle(vehicleData) {
    const vehicle = new Vehicle(
      null,
      vehicleData.vehicleType,
      vehicleData.loadCapacity,
      vehicleData.licensePlate,
      vehicleData.operatingCompany
    );

    vehicle.validate();
    const id = await this.vehicleRepository.create(vehicle);
    return id;
  }

  async updateVehicle(id, vehicleData) {
    const vehicle = new Vehicle(
      id,
      vehicleData.vehicleType,
      vehicleData.loadCapacity,
      vehicleData.licensePlate,
      vehicleData.operatingCompany
    );

    vehicle.validate();
    const success = await this.vehicleRepository.update(id, vehicle);
    if (!success) {
      throw new Error('Vehicle not found');
    }
    return vehicle;
  }

  async deleteVehicle(id) {
    const success = await this.vehicleRepository.delete(id);
    if (!success) {
      throw new Error('Vehicle not found');
    }
    return true;
  }
}

module.exports = VehicleService;