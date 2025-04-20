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

module.exports = { createClient };