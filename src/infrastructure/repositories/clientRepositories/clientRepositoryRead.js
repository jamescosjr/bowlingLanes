const Client = require('../../schemas/clientSchema.js');
const { AppError, NotFoundError } = require("../../../domain/erros/customErros");

async function getAllClients(filter = {}, page = 1, limit = 10) {
    try {
        const skip = (page - 1) * limit;
        return await Client.find(filter).skip(skip).limit(limit);
    } catch (error) {
        throw new AppError('Failed to get all clients');
    }
}

module.exports = {
    getAllClients,
}