const {
    createClient,
} = require('../../infrastructure/repositories/clientRepositories/clientRepositoryWrite.js');

async function createClientService (name, documentId, age) {
    const clientSchedule = [];
    try {
        return await createClient(name, clientSchedule, documentId, age);
    } catch (error) {
        throw new AppError('Failed to create client', error);
    }
}

module.exports = {
    createClientService,
};