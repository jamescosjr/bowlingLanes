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

async function deleteSchedule(id) {
    try {
        const result = await Schedule.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            throw new NotFoundError('Schedule not found', 404);
        }
    } catch (error) {
        throw new AppError('Failed to delete schedule');
    }
}

module.exports = {
    createSchedule,
    deleteSchedule,
};