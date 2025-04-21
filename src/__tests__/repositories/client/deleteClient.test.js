const { AppError } = require('../../../domain/erros/customErros.js');
const { 
    createClient, 
    deleteClientById,
} = require('../../../infrastructure/repositories/clientRepositories/clientRepositoryWrite.js');
const { getClientByDocumentId, getAllClients } = require('../../../infrastructure/repositories/clientRepositories/clientRepositoryRead.js');
const  { connect, closeDatabase, clearDatabase } = require('../../../../jest/jest.setup');

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeDatabase();
});

describe('deleteClientById', () => {
    it ('should delete a client with the given ID', async () => {
        const name = 'John Doe';
        const clientSchedule = [];
        const documentId = '123456789';
        const age = 30;

        const client = await createClient(name, clientSchedule, documentId, age);

        expect(client.toObject()).toMatchObject({
            name,
            clientSchedule,
            documentId,
            age,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });

        await deleteClientById(client._id); 

        const clients = await getAllClients();
        expect(clients).toEqual([]);
    });

    it ('should throw an error if client not found', async () => {
        await expect(deleteClientById('invalid-id   ')).rejects.toThrow(AppError);
    });
});