const Schedule = require('../../schemas/scheduleSchema.js');
const { AppError, NotFoundError } = require("../../../domain/erros/customErros.js");

async function createSchedule(date, startHour, endHour, bowlingLaneId, clientId) {
    try {
        const schedule = {
            date,
            startHour,
            endHour,
            bowlingLaneId,
            clientId
        };
        return await Schedule.create(schedule);
    } catch (error) {
        throw new AppError('Failed to create schedule');
    }
}

module.exports = {
    createSchedule,
};