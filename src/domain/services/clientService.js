const {
    createClient,
    updateClientById,
    deleteClientById,
} = require('../../infrastructure/repositories/clientRepositories/clientRepositoryWrite.js');
const { AppError } = require('../erros/customErros.js');
const {
    getAllClients,
    getClientById,
    getClientByDocumentId,
    getClientBySchedule,
} = require('../../infrastructure/repositories/clientRepositories/clientRepositoryRead.js');
const { NotFoundError } = require('../erros/customErros.js');
const { normalizeDate, integerToStringHour } = require('../utils/dates.js'); 


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

async function getClientByScheduleService({ date, startHour }) {
    try {
        const normalizedDate = normalizeDate(date);

        const normalizedStartHour = integerToStringHour(startHour);

        const endHour = integerToStringHour(startHour + 2);

        return await getClientBySchedule({ date: normalizedDate, startHour: normalizedStartHour, endHour });
    } catch (error) {
        throw new AppError('Failed to get client by schedule', error);
    }
}

async function updateClientByIdService(id, updatedData) {
    try {
        const result = await updateClientById(id, updatedData);
        if (result.matchedCount === 0) {
            throw new NotFoundError('Client not found');
        }
        return result;
    } catch (error) {
        throw new AppError('Failed to update client', error);
    }
}

async function deleteClientByIdService(id) {
    try {
        const result = await deleteClientById(id);
        if (result.deletedCount === 0) {
            throw new NotFoundError('Client not found');
        }
        return result;
    } catch (error) {
        throw new AppError('Failed to delete client', error);
    }
}

module.exports = {
    createClientService,
    getAllClientsService,
    getClientByIdService,
    getClientByDocumentIdService,
    getClientByScheduleService,
    updateClientByIdService,
    deleteClientByIdService,
};