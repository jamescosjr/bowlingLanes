import { createBowlingLane } from "../../infrastructure/repositories/bowlingLaneRepositories/bowlingLaneRepositoryWrite";
import { AppError } from "../erros/customErros";

export async function createBowlingLaneService(name) {
    try {
        const laneSchedule = [];
        return await createBowlingLane(name, laneSchedule);
    } catch (error) {
        throw new AppError('Failed to create bowling lane', error);
    }
}