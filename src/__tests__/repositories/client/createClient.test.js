const { AppError } = require('../../../domain/erros/customErros.js');
const { createClient } = require('../../../infrastructure/repositories/clientRepositories/clientRepositoryWrite.js');
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

describe('createClient', () => {
    it('should create a client with the given name and schedule', async () => {
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

        expect(result._id).toBeDefined();
    });

    it('should throw an error if creation fails', async () => {
        const clientSchedule = [];
        const documentId = '123456789';
        const age = 30;

        await expect(createClient(clientSchedule, documentId, age)).rejects.toThrow(AppError);
    });
});