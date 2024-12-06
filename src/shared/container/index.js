const awilix = require('awilix');
const { Lifetime } = require('awilix');

// Repositories
const UserRepository = require('../../infrastructure/repositories/MySQLUserRepository');
const VehicleRepository = require('../../infrastructure/repositories/MySQLVehicleRepository');

// Services
const AuthService = require('../../application/services/AuthService');
const VehicleService = require('../../application/services/VehicleService');

// Controllers
const AuthController = require('../../interfaces/controllers/AuthController');
const VehicleController = require('../../interfaces/controllers/VehicleController');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
});

container.register({
  // Repositories
  userRepository: awilix.asClass(UserRepository, { lifetime: Lifetime.SINGLETON }),
  vehicleRepository: awilix.asClass(VehicleRepository, { lifetime: Lifetime.SINGLETON }),

  // Services
  authService: awilix.asClass(AuthService, { lifetime: Lifetime.SINGLETON }),
  vehicleService: awilix.asClass(VehicleService, { lifetime: Lifetime.SINGLETON }),

  // Controllers
  authController: awilix.asClass(AuthController, { lifetime: Lifetime.SINGLETON }),
  vehicleController: awilix.asClass(VehicleController, { lifetime: Lifetime.SINGLETON })
});

module.exports = container;