import { BowlingLane } from "../../schemas/bowlingLaneSchema";
import { AppError } from "../../../domain/erros/customErros.js";

export async function createBowlingLane(name, laneSchedule) {
    try {
        const bowlingLane = {
            name,
            laneSchedule,
        };
        return await BowlingLane.create(bowlingLane);
    } catch (error) {
        throw new AppError('Failed to create bowling lane');
    }
}