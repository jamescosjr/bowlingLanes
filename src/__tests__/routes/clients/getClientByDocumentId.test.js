const supertest = require('supertest');
const { connect, closeDatabase, clearDatabase } = require('../../../../jest/jest.setup.js');
const app = require('../../../server.js');
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

describe('GET /clients/documentId/:documentId', () => {
    it ('should return 200 when get correctly a client by documentId', async () => {
        const client = {
            name: 'John Doe',
            documentId: '123456789',
            age: 30,
        };

        const result = await supertest(app)
            .post('/clients')
            .send(client)
            .expect(201);

        expect(result.status).toBe(201);
        expect(result.body).toEqual(expect.objectContaining({
            name: client.name,
            documentId: client.documentId,
            age: client.age,
            clientSchedule: [],
            _id: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            __v: expect.any(Number),
        }));

        const response = await supertest(app)
            .get(`/clients/document/${result.body.documentId}`)
            .expect(200);

        expect(response.body).toEqual(expect.objectContaining({
            name: client.name,
            documentId: client.documentId,
            age: client.age,
            clientSchedule: [],
            _id: result.body._id,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            __v: expect.any(Number),
        }));
        expect(response.body).toHaveProperty('clientSchedule');
    });

    it ('should return 500 when get a client by documentId with invalid id', async () => {
        const client = {
            name: 'John Doe',
            documentId: '123456789',
            age: 30,
        };

        const result = await supertest(app)
            .post('/clients')
            .send(client)
            .expect(201);

        expect(result.status).toBe(201);
        expect(result.body).toEqual(expect.objectContaining({
            name: client.name,
            documentId: client.documentId,
            age: client.age,
            clientSchedule: [],
            _id: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            __v: expect.any(Number),
        }));

        const response = await supertest(app)
            .get(`/clients/document/${result.body.documentId}123`)
            .expect(500);

        expect(response.status).toBe(500);
    });
});