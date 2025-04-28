const Schedule = require('../../schemas/scheduleSchema.js');
const { AppError } = require("../../../domain/erros/customErros.js");

async function getAllSchedules(filter, skip, limit) {
    try {
        const query = {};

        if (filter.date) {
            query.date = filter.date;
        }
        if (filter.startHour) {
            query.startHour = filter.startHour;
        }
        if (filter.bowlingLaneId) {
            query.bowlingLaneId = filter.bowlingLaneId;
        }
        if (filter.clientId) {
            query.clientId = filter.clientId;
        }

        const schedules = await Schedule.find(query)
            .skip(skip)
            .limit(limit)
            .exec();

        return schedules;
    } catch (error) {
        throw new AppError('Error fetching schedules', 500);
    }    
}

async function getScheduleById(id) {
    
    try {
        const schedule = await Schedule.findById(id);
        if (!schedule) {
            throw new AppError('Schedule not found', 404);
        }
        return schedule;
    } catch (error) {
        throw new AppError('Error fetching schedule by ID', 500);
    }
}

module.exports = {
    getAllSchedules,
    getScheduleById,
};
