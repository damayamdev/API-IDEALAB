const express = require('express');
const container = require('../../shared/container');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
const vehicleController = container.resolve('vehicleController');

router.use(authMiddleware);

router.get('/', (req, res) => vehicleController.getAllVehicles(req, res));
router.get('/:id', (req, res) => vehicleController.getVehicleById(req, res));
router.post('/', (req, res) => vehicleController.createVehicle(req, res));
router.put('/:id', (req, res) => vehicleController.updateVehicle(req, res));
router.delete('/:id', (req, res) => vehicleController.deleteVehicle(req, res));

module.exports = router;