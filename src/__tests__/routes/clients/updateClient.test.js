const supertest = require('supertest');
const { connect, closeDatabase, clearDatabase } = require('../../../../jest/jest.setup.js');
const app = require('../../../server.js');
const { createClient } = require('../../../infrastructure/repositories/clientRepositories/clientRepositoryWrite.js');
const { getClientById } = require('../../../infrastructure/repositories/clientRepositories/clientRepositoryRead.js');

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeDatabase();
});

describe('PUT /clients/:id', () => {
    it ('should update a client with the given ID', async () => {
        const name = 'John Doe';
        const documentId = '123456789';
        const age = 30;

        const client = await createClient(name, [], documentId, age);

        const updatedData = {
            name: 'Jane Doe',
            age: 31,
        };

        const response = await supertest(app)
            .put(`/clients/${client._id}`)
            .send(updatedData);

        const updatedClient = await getClientById(client._id);

        expect(response.status).toBe(200);
        expect(updatedClient).toMatchObject({  
            name: 'Jane Doe',
            age: 31,
            documentId: '123456789'
        });          
    });

    it ('should return 404 if client not found', async () => {
        const updatedData = {
            name: 'Jane Doe',
            age: 31,
        };

        const response = await supertest(app)
            .put('/clients/invalid-id')
            .send(updatedData);

        expect(response.status).toBe(500);
    });
});