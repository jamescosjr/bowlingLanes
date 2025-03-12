import express from 'express';
import { createBowlingLaneController } from './bowlingLaneController.js';

const routes = express.Router();

routes.post('/bowling-lanes', createBowlingLaneController);

export default routes;