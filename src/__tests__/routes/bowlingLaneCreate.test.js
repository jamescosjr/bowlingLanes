const supertest = require('supertest');
const { connect, closeDatabase, clearDatabase } = require('../../../jest/jest.setup.js');
const app = require('../../server.js');

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeDatabase();
});
describe('POST /bowling-lanes', () => {
    it('should create a new bowling lane', async () => {
        const newLane = {
            name: 'Lane 1',
        };

        const response = await supertest(app).post('/bowling-lanes').send(newLane);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe(newLane.name);
    });

    it('should return 400 if required fields are missing', async () => {
        const newLane = {
            name: ''
        };

        const response = await supertest(app)
            .post('/bowling-lanes')
            .send(newLane)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('The name should be a valid string');
    });
});