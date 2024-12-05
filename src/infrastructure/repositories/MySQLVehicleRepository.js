const IVehicleRepository = require('../../domain/repositories/IVehicleRepository');
const Vehicle = require('../../domain/entities/Vehicle');
const { pool } = require('../database/mysql');

class MySQLVehicleRepository extends IVehicleRepository {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM vehicles');
    return rows.map(row => new Vehicle(
      row.vehicle_id,
      row.vehicle_type,
      row.load_capacity,
      row.license_plate,
      row.operating_company
    ));
  }

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM vehicles WHERE vehicle_id = ?', [id]);
    if (rows.length === 0) return null;
    
    const row = rows[0];
    return new Vehicle(
      row.vehicle_id,
      row.vehicle_type,
      row.load_capacity,
      row.license_plate,
      row.operating_company
    );
  }

  async create(vehicle) {
    const [result] = await pool.query(
      'INSERT INTO vehicles (vehicle_type, load_capacity, license_plate, operating_company) VALUES (?, ?, ?, ?)',
      [vehicle.vehicleType, vehicle.loadCapacity, vehicle.licensePlate, vehicle.operatingCompany]
    );
    return result.insertId;
  }

  async update(id, vehicle) {
    const [result] = await pool.query(
      'UPDATE vehicles SET vehicle_type = ?, load_capacity = ?, license_plate = ?, operating_company = ? WHERE vehicle_id = ?',
      [vehicle.vehicleType, vehicle.loadCapacity, vehicle.licensePlate, vehicle.operatingCompany, id]
    );
    return result.affectedRows > 0;
  }

  async delete(id) {
    const [result] = await pool.query('DELETE FROM vehicles WHERE vehicle_id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = MySQLVehicleRepository;