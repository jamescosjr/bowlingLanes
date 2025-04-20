const supertest = require('supertest');
const { connect, closeDatabase, clearDatabase } = require('../../../../jest/jest.setup.js');
const app = require('../../../server.js');

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeDatabase();
});

describe('POST /clients', () => {
    it('should create a new client', async () => {
        const newClient = {
            name: 'John Doe',
            documentId: '123456789',
            age: 30,
        };

        const response = await supertest(app).post('/clients').send(newClient);

        expect(response.status).toBe(201);
    });

    it ('should return 400 if the client data is invalid', async () => {
        const invalidClient = {
            name: '',
            documentId: '123456789',
            age: 30,
        };

        const response = await supertest(app).post('/clients').send(invalidClient);
        expect(response.status).toBe(400);
    });
});