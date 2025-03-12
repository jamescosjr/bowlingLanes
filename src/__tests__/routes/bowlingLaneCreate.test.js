import supertest from 'supertest';
import  { connect, closeDatabase, clearDatabase } from '../../../jest/jest.setup.js';
import app from '../../server.js';

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
        expect(response.body.location).toBe(newLane.location);
        expect(response.body.status).toBe(newLane.status);
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