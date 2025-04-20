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
describe('PUT /bowling-lanes', () => {
    it('should create a new bowling lane', async () => {
        const newLane = {
            name: 'Lane 1',
        };

        const response = await supertest(app).post('/bowling-lanes').send(newLane);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe(newLane.name);

        const updates = {
            name: 'Updated Lane 1',
        };
        const updateResponse = await supertest(app)
            .put(`/bowling-lanes/${response.body._id}`)
            .send(updates);
        expect(updateResponse.status).toBe(200);
        
        const updatedLane = await supertest(app)
        .get(`/bowling-lanes/name/Updated Lane 1`)
        .expect(200);
        expect(updatedLane.body).toEqual(expect.objectContaining({
            name: updates.name,
            laneSchedule: [],
            _id: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            __v: expect.any(Number),
        }));
    });
});