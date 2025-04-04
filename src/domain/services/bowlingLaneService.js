const { createBowlingLane } = require("../../infrastructure/repositories/bowlingLaneRepositories/bowlingLaneRepositoryWrite.js");
const { AppError, NotFoundError } = require("../erros/customErros.js");
const { 
    getAllLanes,
    getLaneByName,
 } = require("../../infrastructure/repositories/bowlingLaneRepositories/bowlingLaneRepositoryRead.js");

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

async function getLaneByNameService(name) {
    try {
        const result = await getLaneByName(name);        
        return result;
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error;
        }
        throw new AppError('Failed to get lane by name');
    }
}

module.exports = {
    createBowlingLaneService,
    getAllLanesService,
    getLaneByNameService,
}