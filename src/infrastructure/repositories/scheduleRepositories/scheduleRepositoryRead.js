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

module.exports = {
    getAllSchedules,
};
