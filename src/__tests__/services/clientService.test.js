const { 
    createClientService,
} = require('../../domain/services/clientService.js');
const { connect, closeDatabase, clearDatabase } = require('../../../jest/jest.setup.js');
const { AppError } = require('../../middleware/errorHandler.js');

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeDatabase();
});

describe('clientService', () => {
    describe('createClientService', () => {
        it ('should create a client with the given name and schedule', async () => {
            const name = 'John Doe';
            const documentId = '123456789';
            const age = 30;

            const result = await createClientService(name, documentId, age);

            expect(result.toObject()).toMatchObject({
                name,
                documentId,
                age,
                clientSchedule: [],
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            });

            expect(result._id).toBeDefined();
        });

        it ('should throw an error if creation fails', async () => {
            const name = '';
            const documentId = '123456789';
            const age = 30;

            await expect(createClientService(name, documentId, age)).rejects.toThrow(AppError);
        });
    })
})