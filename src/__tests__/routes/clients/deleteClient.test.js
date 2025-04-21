const supertest = require('supertest');
const { connect, closeDatabase, clearDatabase } = require('../../../../jest/jest.setup.js');
const app = require('../../../server.js');
const { createClient } = require('../../../infrastructure/repositories/clientRepositories/clientRepositoryWrite.js');
const { getAllClients } = require('../../../infrastructure/repositories/clientRepositories/clientRepositoryRead.js');

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeDatabase();
});

describe('DELETE /clients/:id', () => {
    it ('should delete a client with the given ID', async () => {
        const name = 'John Doe';
        const documentId = '123456789';
        const age = 30;

        const client = await createClient(name, [], documentId, age);

        expect(client).toBeDefined();

        const response = await supertest(app)
            .delete(`/clients/${client._id}`);

        expect(response.status).toBe(204);

        const clients = await getAllClients();

        expect(clients).toHaveLength(0);
    });

    it ('should return 404 if client not found', async () => {
        const response = await supertest(app)
            .delete('/clients/invalid-id');

        expect(response.status).toBe(500);
    });
});