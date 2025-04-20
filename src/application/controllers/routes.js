const express = require('express');
const { 
    createBowlingLaneController,
    getAllLanesController,
    getLaneByNameController,
    getLanesByScheduleController,
    updateLaneByIdController,
    deleteLaneByIdController,
 } = require('./bowlingLaneController.js');
const {
    createClientController,
    getAllClientsController,
} = require('../controllers/clientController.js')

const routes = express.Router();

routes.post('/bowling-lanes', createBowlingLaneController);
routes.get('/bowling-lanes', getAllLanesController);
routes.get('/bowling-lanes/name/:name', getLaneByNameController);
routes.get('/bowling-lanes/schedule', getLanesByScheduleController);
routes.put('/bowling-lanes/:id', updateLaneByIdController);
routes.delete('/bowling-lanes/:id', deleteLaneByIdController);

routes.post('/clients', createClientController);
routes.get('/clients', getAllClientsController);

module.exports = routes;