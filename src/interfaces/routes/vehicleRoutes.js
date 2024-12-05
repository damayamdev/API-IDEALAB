const express = require('express');
const VehicleController = require('../controllers/VehicleController');
const MySQLVehicleRepository = require('../../infrastructure/repositories/MySQLVehicleRepository');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
const vehicleRepository = new MySQLVehicleRepository();
const vehicleController = new VehicleController(vehicleRepository);

//router.use(authMiddleware);

router.get('/', (req, res) => vehicleController.getAllVehicles(req, res));
router.get('/:id', (req, res) => vehicleController.getVehicleById(req, res));
router.post('/', (req, res) => vehicleController.createVehicle(req, res));
router.put('/:id', (req, res) => vehicleController.updateVehicle(req, res));
router.delete('/:id', (req, res) => vehicleController.deleteVehicle(req, res));

module.exports = router;