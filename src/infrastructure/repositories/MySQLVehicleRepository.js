const IVehicleRepository = require('../../domain/repositories/IVehicleRepository');
const Vehicle = require('../../domain/entities/Vehicle');
const VehicleModel = require('../database/models/vehicle.model');

class MySQLVehicleRepository extends IVehicleRepository {
  async findAll() {
    const vehicles = await VehicleModel.findAll({
      include: ['creator']
    });
    
    return vehicles.map(vehicle => new Vehicle(
      vehicle.id,
      vehicle.vehicleType,
      vehicle.loadCapacity,
      vehicle.licensePlate,
      vehicle.operatingCompany
    ));
  }

  async findById(id) {
    const vehicle = await VehicleModel.findByPk(id, {
      include: ['creator']
    });
    
    if (!vehicle) return null;
    
    return new Vehicle(
      vehicle.id,
      vehicle.vehicleType,
      vehicle.loadCapacity,
      vehicle.licensePlate,
      vehicle.operatingCompany
    );
  }

  async create(vehicle) {
    const newVehicle = await VehicleModel.create({
      vehicleType: vehicle.vehicleType,
      loadCapacity: vehicle.loadCapacity,
      licensePlate: vehicle.licensePlate,
      operatingCompany: vehicle.operatingCompany
    });
    
    return newVehicle.id;
  }

  async update(id, vehicle) {
    const [updatedRows] = await VehicleModel.update({
      vehicleType: vehicle.vehicleType,
      loadCapacity: vehicle.loadCapacity,
      licensePlate: vehicle.licensePlate,
      operatingCompany: vehicle.operatingCompany
    }, {
      where: { id }
    });
    
    return updatedRows > 0;
  }

  async delete(id) {
    const deletedRows = await VehicleModel.destroy({
      where: { id }
    });
    
    return deletedRows > 0;
  }
}

module.exports = MySQLVehicleRepository;