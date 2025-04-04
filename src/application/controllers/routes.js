const express = require('express');
const { 
    createBowlingLaneController,
    getAllLanesController,
    getLaneByNameController,
 } = require('./bowlingLaneController.js');

const routes = express.Router();

routes.post('/bowling-lanes', createBowlingLaneController);
routes.get('/bowling-lanes', getAllLanesController);
routes.get('/bowling-lanes/:name', getLaneByNameController);

module.exports = routes;