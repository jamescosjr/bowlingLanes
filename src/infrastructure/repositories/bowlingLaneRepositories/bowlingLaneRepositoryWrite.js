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

async function updateLaneById(id, updates) {
    try {
        const result = await BowlingLane.updateOne(
            { _id: id },
            { $set: updates }
        );

        if (result.matchedCount === 0) {
            throw new NotFoundError('Lane not found', 404);
        }
    } catch (error) {
        throw new AppError('Failed to update bowling lane');
    }
}

async function deleteLaneById(id) {
    try {
        const result = await BowlingLane.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            throw new NotFoundError('Lane not found', 404);
        }
    } catch (error) {
        throw new AppError('Failed to delete bowling lane');
    }
}

module.exports = { 
    createBowlingLane,
    addScheduleOnLane,
    updateLaneById,
    removeScheduleOnLane,
    deleteLaneById,
 };