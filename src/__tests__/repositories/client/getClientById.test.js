const {
    getClientById,
} = require('../../../infrastructure/repositories/clientRepositories/clientRepositoryRead.js');
const { connect, closeDatabase, clearDatabase } = require('../../../../jest/jest.setup');
const { createClient } = require('../../../infrastructure/repositories/clientRepositories/clientRepositoryWrite.js');
const { AppError } = require('../../../domain/erros/customErros.js');

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeDatabase();
});

describe('GET /clients/:id', () => {
    it ('should return correctly client by id', async () => {
        const name = 'John Doe';
        const clientSchedule = [];
        const documentId = '123456789';
        const age = 30;

        const result = await createClient(name, clientSchedule, documentId, age);

        expect(result.toObject()).toMatchObject({
            name,
            clientSchedule,
            documentId,
            age,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });

        const clientById = await getClientById(result._id);
        expect(clientById.toObject()).toMatchObject({
            name,
            clientSchedule,
            documentId,
            age,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
    });

    it ('should throw NotFoundError if client does not exist', async () => {
        const nonExistentId = 'non-existent-id';
        
        await expect(getClientById(nonExistentId)).rejects.toThrow(AppError);
    });
});