const {
    getClientBySchedule,
} = require('../../../infrastructure/repositories/clientRepositories/clientRepositoryRead.js');
const { connect, closeDatabase, clearDatabase } = require('../../../../jest/jest.setup');
const { 
    createClient,
    addScheduleOnClient,
 } = require('../../../infrastructure/repositories/clientRepositories/clientRepositoryWrite.js');
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

describe('getClientBySchedule', () => {
    it ('should return correctly client by schedule', async () => {
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

        const updatedClientSchedule1 =
            {
                date: new Date(2025, 7, 12),
                startHour: '10:00',
                endHour: '12:00',
                bowlingLane: 'Lane 1',
            }

        await addScheduleOnClient(documentId, updatedClientSchedule1);
        const clientBySchedule = await getClientBySchedule(updatedClientSchedule1);

        expect(clientBySchedule[0]).toMatchObject({
            name,
            clientSchedule: [
                {
                    date: updatedClientSchedule1.date,
                    startHour: updatedClientSchedule1.startHour,
                    endHour: updatedClientSchedule1.endHour,
                    bowlingLane: updatedClientSchedule1.bowlingLane,
                }
            ],
            documentId,
            age,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
        expect(clientBySchedule).toHaveLength(1);
    });

    it ('should return an empty array if client does not exist', async () => {
        const nonExistentSchedule = {
            date: new Date(2025, 7, 12),
            startHour: '10:00',
            endHour: '12:00',
            bowlingLane: 'Lane 1',
        };

        const clientBySchedule = await getClientBySchedule(nonExistentSchedule);

        expect(clientBySchedule).toHaveLength(0);

    });
});