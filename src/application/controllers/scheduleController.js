const { 
    createScheduleService,
    getAllSchedulesService,
    deleteScheduleService
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
        const { date, startHour, bowlingLaneId, clientId, page = 1, limit = 10 } = req.query;
        const filters = {};

        if (date) filters.date = date;
        if (startHour) filters.startHour = startHour;
        if (bowlingLaneId) filters.bowlingLaneId = bowlingLaneId;
        if (clientId) filters.clientId = clientId;

        const result = await getAllSchedulesService(filters, Number(page), Number(limit));
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

async function deleteScheduleController(req, res, next) {
    try {
        const { id } = req.params;
        await deleteScheduleService(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createScheduleController,
    getAllSchedulesController,
    deleteScheduleController    
};