const express = require('express');
const { 
    createBowlingLaneController,
    getAllLanesController,
 } = require('./bowlingLaneController.js');

const routes = express.Router();

routes.post('/bowling-lanes', createBowlingLaneController);
routes.get('/bowling-lanes', getAllLanesController);

module.exports = routes;