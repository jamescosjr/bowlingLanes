const BowlingLane = require("../../schemas/bowlingLaneSchema");
const { AppError, NotFoundError } = require("../../../domain/erros/customErros");

async function getAllLanes(filter = {}, page = 1, limit = 10) {
    try {
        const skip = (page - 1) * limit;
        return await BowlingLane.find(filter).skip(skip).limit(limit);
    } catch (error) {
        throw new AppError('Failed to get all lanes');
    }
}

async function getLaneByName(name) {
    try {
        const result = await BowlingLane.findOne({ name: name });
        if (!result) {
            throw new NotFoundError('Lane doesn\'t exist');
        }
        return result;
    } catch (error) {
        throw new AppError('Failed to get lane by name');
    }
}

module.exports = {
    getAllLanes,
    getLaneByName,
}