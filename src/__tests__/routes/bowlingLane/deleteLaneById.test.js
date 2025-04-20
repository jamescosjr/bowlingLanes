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
describe('DELETE /bowling-lanes', () => {
    it('should delete a bowling lane', async () => {
        const newLane = {
            name: 'Lane 1',
        };

        const response = await supertest(app).post('/bowling-lanes').send(newLane);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe(newLane.name);

        const deleteLane = await supertest(app)
            .delete(`/bowling-lanes/${response.body._id}`)
            .send();
        
        expect(deleteLane.status).toBe(204);
    });

    it('should return 500 if the lane does not exist', async () => {
        const nonExistentId = '60c72b2f9b1d8a3f4c8e4e9f';

        const response = await supertest(app).delete(`/bowling-lanes/${nonExistentId}`).send();

        expect(response.status).toBe(500);
    });
});