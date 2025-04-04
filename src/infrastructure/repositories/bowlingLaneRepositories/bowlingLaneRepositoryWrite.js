const BowlingLane = require("../../schemas/bowlingLaneSchema.js");
const { AppError } = require("../../../domain/erros/customErros.js");

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

module.exports = { 
    createBowlingLane,
 };