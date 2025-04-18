const BowlingLane = require("../../schemas/bowlingLaneSchema.js");
const { AppError, NotFoundError } = require("../../../domain/erros/customErros.js");

async function createBowlingLane(name, laneSchedule) {
    try {
        const bowlingLane = {
            name,
            laneSchedule,
        };
        return await BowlingLane.create(bowlingLane);
    } catch (error) {
        throw new AppError('Failed to create bowling lane');
    }
}
async function addScheduleOnLane(name, laneSchedule) {
    if (!laneSchedule) {
        throw new AppError('Invalid schedule provided');
    }
    try {
        const result = await BowlingLane.updateOne(
            { name: name },
            { $push: { laneSchedule } }
        );

        if (result.matchedCount === 0) {
            throw new NotFoundError('Lane not found', 404);
        }
    } catch (error) {
        throw new AppError('Failed to update bowling lane');
    }
}

async function removeScheduleOnLane(name, scheduleToRemove) {
    if (!scheduleToRemove) {
        throw new AppError('Invalid schedule to remove provided');
    }
    try {
        const result = await BowlingLane.updateOne(
            { name: name },
            { $pull: { laneSchedule: scheduleToRemove } }
        );

        if (result.matchedCount === 0) {
            throw new NotFoundError('Lane not found', 404);
        }
    } catch (error) {
        throw new AppError('Failed to update bowling lane');
    }
}

async function updateLaneById(id, updateData) {
    if (!updateData || typeof updateData !== 'object') {
        throw new AppError('Invalid update data provided');
    }
    try {
        const result = await BowlingLane.updateOne(
            { _id: id },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            throw new NotFoundError('Lane not found', 404);
        }
    } catch (error) {
        throw new AppError('Failed to update bowling lane');
    }
}

module.exports = { 
    createBowlingLane,
    addScheduleOnLane,
    updateLaneById,
    removeScheduleOnLane,
 };