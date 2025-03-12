import { BowlingLane } from "../../schemas/bowlingLaneSchema";
import { AppError } from "../../../domain/erros/customErros";

export async function getAllLanes(filter = {}, page = 1, limit = 10) {
    try {
        const skip = (page - 1) * limit;
        return await BowlingLane.find(filter).skip(skip).limit(limit);
    } catch (error) {
        throw new AppError('Failed to get all lanes');
    }
}