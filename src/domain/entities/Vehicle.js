class Vehicle {
  constructor(id, vehicleType, loadCapacity, licensePlate, operatingCompany) {
    this.id = id;
    this.vehicleType = vehicleType;
    this.loadCapacity = loadCapacity;
    this.licensePlate = licensePlate;
    this.operatingCompany = operatingCompany;
  }

  validate() {
    if (!this.vehicleType || !this.loadCapacity || !this.licensePlate || !this.operatingCompany) {
      throw new Error('All fields are required');
    }
  }
}

module.exports = Vehicle;