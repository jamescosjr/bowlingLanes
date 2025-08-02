const {
    getAllClients,
} = require('../../../infrastructure/repositories/clientRepositories/clientRepositoryRead.js');
const { connect, closeDatabase, clearDatabase } = require('../../../../jest/jest.setup');
const { createClient } = require('../../../infrastructure/repositories/clientRepositories/clientRepositoryWrite.js')

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeDatabase();
});

describe('getAllClients', () => {
    it ('should return all Clients', async () => {
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

        const allClients = await getAllClients();
        expect(allClients).toHaveLength(1);
        expect(allClients[0].toObject()).toMatchObject({
            name,
            clientSchedule,
            documentId,
            age,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
    });

    it ('should return an empty array if there are no clients', async () => {
        const allClients = await getAllClients();
        expect(allClients).toHaveLength(0);
    });

    it ('should return more than 10 clients', async () => {
        for (let i = 1; i <= 15; i++) {
            await createClient(`Client ${i}`, [], `documentId${i}`, 20 + i);
        }


        const allClients = await getAllClients();
        expect(allClients).toHaveLength(15);
    });
})