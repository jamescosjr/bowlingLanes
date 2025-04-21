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

async function getClientById(id) {
    try {
        const result = await Client.findById(id);
        if (!result) {
            throw new NotFoundError('Client not found');
        }
        return result;
    } catch (error) {
        throw new AppError('Failed to get client by ID');
    }
}

async function getClientByDocumentId(documentId) {
    try {
        const result = await Client.findOne({ documentId });
        if (!result) {
            throw new NotFoundError('Client not found');
        }
        return result;
    } catch (error) {
        throw new AppError('Failed to get client by document ID');
    }
}

module.exports = {
    getAllClients,
    getClientById,
    getClientByDocumentId,
}