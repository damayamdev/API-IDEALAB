const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');
const User = require('./user.model');

const Vehicle = sequelize.define('Vehicle', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  vehicleType: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'vehicle_type'
  },
  loadCapacity: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'load_capacity',
    validate: {
      isDecimal: true,
      min: 0
    }
  },
  licensePlate: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
    field: 'license_plate',
    validate: {
      is: /^[A-Z0-9]{6,10}$/
    }
  },
  operatingCompany: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'operating_company'
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'created_by',
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  tableName: 'vehicles',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Vehicle.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

module.exports = Vehicle;