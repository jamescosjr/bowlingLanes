const express = require('express');
const { 
    createBowlingLaneController,
    getAllLanesController,
    getLaneByNameController,
    getLanesByScheduleController,
    getLaneByIdController,
    updateLaneByIdController,
    deleteLaneByIdController,
 } = require('./bowlingLaneController.js');
const {
    createClientController,
    getAllClientsController,
    getClientByIdController,
} = require('../controllers/clientController.js')

const routes = express.Router();

routes.post('/bowling-lanes', createBowlingLaneController);
routes.get('/bowling-lanes', getAllLanesController);
routes.get('/bowling-lanes/name/:name', getLaneByNameController);
routes.get('/bowling-lanes/schedule', getLanesByScheduleController);
routes.get('/bowling-lanes/:id', getLaneByIdController);
routes.put('/bowling-lanes/:id', updateLaneByIdController);
routes.delete('/bowling-lanes/:id', deleteLaneByIdController);

routes.post('/clients', createClientController);
routes.get('/clients', getAllClientsController);
routes.get('/clients/:id', getClientByIdController);

module.exports = routes;