const BowlingLane = require("../../schemas/bowlingLaneSchema");
const { AppError, NotFoundError } = require("../../../domain/erros/customErros");

async function getAllLanes(filter = {}, page = 1, limit = 10) {
    try {
        const skip = (page - 1) * limit;
        return await BowlingLane.find(filter).skip(skip).limit(limit);
    } catch (error) {
        throw new AppError('Failed to get all lanes');
    }
}

async function getLaneByName(name) {
    try {
        const result = await BowlingLane.findOne({ name: name });
        if (!result) {
            throw new NotFoundError('Lane not found');
        }
        return result;
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error;
        }
        throw new AppError('Failed to get lane by name');
    }
}

async function getLanesBySchedule({date, startHour, endHour}) {
    try {
        const result = await BowlingLane.find({
            laneSchedule: {
                $elemMatch: {
                    date: date,
                    startHour: startHour,
                    endHour: endHour,
                }
            }
        }).lean();
        return result;
    } catch (error) {
        throw new AppError('Failed to get lane by schedule');
    }
}

async function getLaneById(id) {
    try {
        const result = await BowlingLane.findById(id);
        if (!result) {
            throw new NotFoundError('Lane not found');
        }
        return result;
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error;
        }
        throw new AppError('Failed to get lane by ID');
    }
}   

module.exports = {
    getAllLanes,
    getLaneByName,
    getLanesBySchedule,
    getLaneById,
}