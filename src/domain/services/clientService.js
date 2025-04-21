const {
    createClient,
} = require('../../infrastructure/repositories/clientRepositories/clientRepositoryWrite.js');
const { AppError } = require('../erros/customErros.js');
const {
    getAllClients,
    getClientById,
    getClientByDocumentId,
    getClientBySchedule,
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

async function getAllClientsService() {
    try {
        const clients = await getAllClients();
        return clients;
    } catch (error) {
        throw new AppError('Failed to get all clients', error);
    }
}

async function getClientByIdService(id) {
    try {
        const client = await getClientById(id);
        if (!client) {
            throw new NotFoundError('Client not found');
        }
        return client;
    } catch (error) {
        throw new AppError('Failed to get client by ID', error);
    }
}

async function getClientByDocumentIdService(documentId) {
    try {
        const client = await getClientByDocumentId(documentId);
        if (!client) {
            throw new NotFoundError('Client not found');
        }
        return client;
    } catch (error) {
        throw new AppError('Failed to get client by document ID', error);
    }
}

async function getClientByScheduleService({ date, startHour, endHour }) {
    try {
        const client = await getClientBySchedule({ date, startHour, endHour });
        if (!client) {
            throw new NotFoundError('Client not found');
        }
        return client;
    } catch (error) {
        throw new AppError('Failed to get client by schedule', error);
    }
}

module.exports = {
    createClientService,
    getAllClientsService,
    getClientByIdService,
    getClientByDocumentIdService,
    getClientByScheduleService,
};