const { 
    createBowlingLaneService,
    getAllLanesService,
    getLaneByNameService,
  } = require("../../domain/services/bowlingLaneService.js");
const validateBowlingLane = require("../../domain/utils/validations.js");
const { ValidationError } = require("../../domain/erros/customErros.js");

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


module.exports = {
    createBowlingLaneController,
    getAllLanesController,
    getLaneByNameController
}