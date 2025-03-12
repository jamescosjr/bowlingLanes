import { createBowlingLaneService } from "../../domain/services/bowlingLaneService.js";
import validateBowlingLane from "../../domain/utils/validations.js";
import { ValidationError } from "../../domain/erros/customErros.js";

export async function createBowlingLaneController(req, res, next) {
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