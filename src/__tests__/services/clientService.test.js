const { 
    createClientService,
    getAllClientsService,
    getClientByIdService,
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

    describe('getAllClients', () => {
        it ('should return all clients', async () => {
            const name = 'John Doe';
            const documentId = '123456789';
            const age = 30;

            await createClientService(name, documentId, age);

            const allClients = await getAllClientsService();
            expect(allClients).toHaveLength(1);
            expect(allClients[0].toObject()).toMatchObject({
                name,
                documentId,
                age,
                clientSchedule: [],
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            });
        });

        it ('should return an empty array if there are no clients', async () => {
            const allClients = await getAllClientsService();
            expect(allClients).toHaveLength(0);
        });
    });

    describe('getClientById', () => {
        it ('should return a client by ID', async () => {
            const name = 'John Doe';
            const documentId = '123456789';
            const age = 30;

            const client = await createClientService(name, documentId, age);
            const clientById = await getClientByIdService(client._id);

            expect(clientById.toObject()).toMatchObject({
                name,
                documentId,
                age,
                clientSchedule: [],
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            }); 
        });

        it ('should throw an error if client does not exist', async () => {
            const nonExistentId = 'non-existent-id';

            await expect(getClientByIdService(nonExistentId)).rejects.toThrow(AppError);
        });
    });
}) ;