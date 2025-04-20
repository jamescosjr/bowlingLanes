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

describe('GET /clients', () => {
    it('should return all clients', async () => {
        const newClient = {
            name: 'John Doe',
            documentId: '123456789',
            age: 30,
        };

        const result = await supertest(app).post('/clients').send(newClient);

        expect(result.status).toBe(201);

        const response = await supertest(app).get(`/clients`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toMatchObject(newClient);
    });

    it('should return an empty array if no clients are found', async () => {
        const response = await supertest(app).get('/clients');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });
});