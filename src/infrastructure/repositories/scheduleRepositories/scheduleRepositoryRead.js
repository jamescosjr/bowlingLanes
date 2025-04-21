const Schedule = require('../../schemas/scheduleSchema.js');
const { AppError } = require("../../../domain/erros/customErros.js");

async function getAllSchedules() {
    try {
        const schedules = await Schedule.find();
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
