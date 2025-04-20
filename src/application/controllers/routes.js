const express = require('express');
const { 
    createBowlingLaneController,
    getAllLanesController,
    getLaneByNameController,
    getLanesByScheduleController,
    updateLaneByIdController,
 } = require('./bowlingLaneController.js');

const routes = express.Router();

routes.post('/bowling-lanes', createBowlingLaneController);
routes.get('/bowling-lanes', getAllLanesController);
routes.get('/bowling-lanes/name/:name', getLaneByNameController);
routes.get('/bowling-lanes/schedule', getLanesByScheduleController);
routes.put('/bowling-lanes/:id', updateLaneByIdController);

module.exports = routes;