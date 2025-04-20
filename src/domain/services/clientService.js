const {
    createClient,
} = require('../../infrastructure/repositories/clientRepositories/clientRepositoryWrite.js');
const { AppError } = require('../erros/customErros.js');
const {
    getAllClients,
} = require('../../infrastructure/repositories/clientRepositories/clientRepositoryRead.js');
const { NotFoundError } = require('../erros/customErros.js');


async function createClientService (name, documentId, age) {
    const clientSchedule = [];
    try {
        return await createClient(name, clientSchedule, documentId, age);
    } catch (error) {
        throw new AppError('Failed to create client', error);
    }
}

async function getAllClientsService(filter = {}, page = 1, limit = 10) {
    try {
        const clients = await getAllClients(filter, page, limit);
        return clients;
    } catch (error) {
        throw new AppError('Failed to get all clients', error);
    }
}

module.exports = {
    createClientService,
    getAllClientsService,
};