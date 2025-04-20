const { 
    createBowlingLaneService,
    getAllLanesService,
    getLaneByNameService,
    getLanesByScheduleService,
    updateLaneByIdService,
    deleteLaneByIdService,
  } = require("../../domain/services/bowlingLaneService.js");
const { validateBowlingLane, validateStartHour, dateValidation  } = require("../../domain/utils/validations.js");
const { ValidationError } = require("../../domain/erros/customErros.js");
const {  } = require('../../domain/utils/validations.js')

async function createBowlingLaneController(req, res, next) {
    try {
        const { name } = req.body;
        const validation = validateBowlingLane(name);
        if(!validation.valid) {
            return next(new ValidationError(validation.message));

        }
        const result = await createBowlingLaneService(name);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

async function getAllLanesController(req, res, next) {
    try {
        const result = await getAllLanesService();
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

async function getLaneByNameController(req, res, next) {
    try {
        const { name } = req.params;
        const result = await getLaneByNameService(name);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

async function getLanesByScheduleController(req, res, next) {
    try {
        const { date, startHour } = req.query;

        const parsedStartHour = parseInt(startHour, 10);
        const validation = validateStartHour(parsedStartHour);

        if (!validation.valid) {
            return next(new ValidationError(validation.message));
        }

        const validDate = dateValidation(date);
        if (!validDate.valid) {
            return next(new ValidationError(validDate.message));
        }

        const result = await getLanesByScheduleService({ date, startHour: parsedStartHour });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

async function updateLaneByIdController(req, res, next) {
    try {
        const { id } = req.params;
        const updates = req.body;

        const validation = validateBowlingLane(updates.name);
        if (!validation.valid) {
            return next(new ValidationError(validation.message));
        }

        const result = await updateLaneByIdService(id, updates);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }   
}

async function deleteLaneByIdController(req, res, next) {
    try {
        const { id } = req.params;
        await deleteLaneByIdService(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}


module.exports = {
    createBowlingLaneController,
    getAllLanesController,
    getLaneByNameController,
    getLanesByScheduleController,
    updateLaneByIdController,
    deleteLaneByIdController,
}