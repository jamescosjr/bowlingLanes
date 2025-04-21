const { 
    createScheduleService,
    getAllSchedulesService,
 } = require('../../domain/services/scheduleService.js');
const { validateSchedule } = require('../../domain/utils/validations.js');
const { ValidationError } = require("../../domain/erros/customErros.js");

async function createScheduleController(req, res, next) {
    try {
        const { date, startHour, bowlingLaneId, clientId } = req.body;
        const validation = validateSchedule(date, startHour, bowlingLaneId, clientId);

        if (!validation.valid) {
            return next(new ValidationError(validation.message));
        }
        const result = await createScheduleService(date, startHour, bowlingLaneId, clientId);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

async function getAllSchedulesController(req, res, next) {
    try {
        const schedules = await getAllSchedulesService();
        res.status(200).json(schedules);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createScheduleController,
    getAllSchedulesController,
};