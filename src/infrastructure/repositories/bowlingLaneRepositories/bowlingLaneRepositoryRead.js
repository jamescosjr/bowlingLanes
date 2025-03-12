import { BowlingLane } from "../../schemas/bowlingLaneSchema";
import { AppError } from "../../../domain/erros/customErros";

export async function getAllLanes() {
    try {
        return await BowlingLane.find();
    } catch (error) {
        throw new AppError('Failed to get all lanes');
    }
}