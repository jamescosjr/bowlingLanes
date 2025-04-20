const { 
    createBowlingLane,
    updateLaneById,
    deleteLaneById,
 } = require("../../infrastructure/repositories/bowlingLaneRepositories/bowlingLaneRepositoryWrite.js");
const { AppError, NotFoundError } = require("../erros/customErros.js");
const { 
    getAllLanes,
    getLaneByName,
    getLanesBySchedule,
 } = require("../../infrastructure/repositories/bowlingLaneRepositories/bowlingLaneRepositoryRead.js");
 const { normalizeDate, integerToStringHour } = require("../../domain/utils/dates.js");

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

async function getLanesByScheduleService({date, startHour}) {
    try {
    const normalizedDate = normalizeDate(date);

    const normalizedStartHour = integerToStringHour(startHour);

    const endHour = integerToStringHour(startHour + 2);
        return await getLanesBySchedule({date: normalizedDate, startHour: normalizedStartHour, endHour});
    } catch (error) {
        throw new AppError('Failed to get lanes by schedule', error);
    }
}

async function updateLaneByIdService(id, updateLane) {
    try {
        return await updateLaneById(id, updateLane);
    } catch (error) {
        throw new AppError('Failed to update lane by ID', error);
    }
}

async function deleteLaneByIdService(id) {
    try {
        return await deleteLaneById(id);
    } catch (error) {
        throw new AppError('Failed to delete lane by ID', error);
    }
}

module.exports = {
    createBowlingLaneService,
    getAllLanesService,
    getLaneByNameService,
    getLanesByScheduleService,
    updateLaneByIdService,
    deleteLaneByIdService,
}