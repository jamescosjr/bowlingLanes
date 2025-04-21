const Client = require('../../schemas/clientSchema.js'); 
const { AppError, NotFoundError } = require("../../../domain/erros/customErros.js");

async function createClient(name, clientSchedule, documentId, age) {
    try {
        const client = {
            name,
            documentId,
            age,
            clientSchedule
        };
        return await Client.create(client);
    } catch (error) {
        throw new AppError('Failed to create client');
    }
}

async function addScheduleOnClient(documentId, clientSchedule) {
    if (!clientSchedule) {
        throw new AppError('Invalid schedule provided');
    }
    try {
        const result = await Client.updateOne(
            {
                documentId: documentId,
                clientSchedule: { $not: { $elemMatch: clientSchedule } }, 
            },
            { $push: { clientSchedule } }
        );

        if (result.matchedCount === 0) {
            throw new NotFoundError('Client not found or schedule already exists', 404);
        }

        return result
    } catch (error) {
        throw new AppError(`Failed to update client: ${error.message}`);
    }
}

async function removeScheduleOnClient(documentId, scheduleToRemove) {
    if (!scheduleToRemove) {
        throw new AppError('Invalid schedule to remove provided');
    }
    try {
        const result = await Client.updateOne(
            { documentId: documentId },
            { $pull: { clientSchedule: scheduleToRemove } }
        );

        if (result.matchedCount === 0) {
            throw new NotFoundError('Client not found', 404);
        }
    } catch (error) {
        throw new AppError('Failed to update client');
    }
}

async function updateClientById(id, updatedData) {
    try {
        const result = await Client.updateOne(
            { _id: id },
            { $set: updatedData }
        );

        if (result.matchedCount === 0) {
            throw new NotFoundError('Client not found', 404);
        }
        return result;
    } catch (error) {
        throw new AppError('Failed to update client');
    }
}

async function deleteClientById(id) {
    try {
        const result = await Client.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            throw new NotFoundError('Client not found', 404);
        }
        return result;
    } catch (error) {
        throw new AppError('Failed to delete client');
    }
}

module.exports = { 
    createClient, 
    addScheduleOnClient, 
    removeScheduleOnClient,
    updateClientById,
    deleteClientById,
};