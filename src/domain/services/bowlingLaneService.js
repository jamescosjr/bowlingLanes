const { createBowlingLane } = require("../../infrastructure/repositories/bowlingLaneRepositories/bowlingLaneRepositoryWrite.js");
const { AppError } = require("../erros/customErros.js");
const { getAllLanes } = require("../../infrastructure/repositories/bowlingLaneRepositories/bowlingLaneRepositoryRead.js");

async function createBowlingLaneService(name) {
    try {
        const laneSchedule = [];
        return await createBowlingLane(name, laneSchedule);
    } catch (error) {
        throw new AppError('Failed to create bowling lane', error);
    }
}

async function getAllLanesService() {
    try {
        return await getAllLanes();
    } catch (error) {
        throw new AppError('Failed to get all lanes', error);
    }
}

module.exports = {
    createBowlingLaneService,
    getAllLanesService,
}