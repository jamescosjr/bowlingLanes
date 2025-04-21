const { AppError } = require('../../../domain/erros/customErros.js');
const { 
    createClient, 
    addScheduleOnClient, 
    removeScheduleOnClient, 
    updateClientById,
} = require('../../../infrastructure/repositories/clientRepositories/clientRepositoryWrite.js');
const { getClientByDocumentId } = require('../../../infrastructure/repositories/clientRepositories/clientRepositoryRead.js');
const { ObjectId } = require('mongodb');
const  { connect, closeDatabase, clearDatabase } = require('../../../../jest/jest.setup');

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeDatabase();
});

describe('updates', () => {
    describe('addScheduleOnClient and removeScheduleOnClient', () => {
        it ('should update a client with the given name and schedule', async () => {
            const name = 'John Doe';
            const clientSchedule = [];
            const documentId = '123456789';
            const age = 30;

            await createClient(name, clientSchedule, documentId, age);

            const updatedClientSchedule1 =
                {
                    date: new Date(2025, 7, 12),
                    startHour: '10:00',
                    endHour: '12:00',
                    bowlingLane: 'Lane 1',
                }

            const updatedClientSchedule2 =
                {
                    date: new Date(2025, 7, 12),
                    startHour: '12:00',
                    endHour: '14:00',
                    bowlingLane: 'Lane 2',
                }
            await addScheduleOnClient(documentId, updatedClientSchedule1);
            await addScheduleOnClient(documentId, updatedClientSchedule2);
            const client = await getClientByDocumentId(documentId);
            expect(client).toMatchObject({
                _id: expect.any(ObjectId),
                name: 'John Doe',
                clientSchedule: [
                    {
                        date: new Date(2025, 7, 12),
                        startHour: '10:00',
                        endHour: '12:00'
                    },
                    {
                        date: new Date(2025, 7, 12),
                        startHour: '12:00',
                        endHour: '14:00'
                    }
                ],
                documentId,
                age,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            }); 

            await removeScheduleOnClient(documentId, updatedClientSchedule1);

            const updatedClient = await getClientByDocumentId(documentId);

            expect(updatedClient).toMatchObject({
                _id: expect.any(ObjectId),
                name: 'John Doe',
                clientSchedule: [
                    {
                        date: new Date(2025, 7, 12),
                        startHour: '12:00',
                        endHour: '14:00'
                    }
                ],
                documentId,
                age,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            });
            expect(updatedClient.clientSchedule.length).toBe(1);
        });
    });

    describe('updateClientById', () => {
        it ('should update a client with the given id', async () => {
            const name = 'John Doe';
            const clientSchedule = [];
            const documentId = '123456789';
            const age = 30;

            await createClient(name, clientSchedule, documentId, age);

            const updatedData = {
                name: 'Jane Doe',
                age: 25,
                clientSchedule: [
                    {
                        date: new Date(2025, 7, 12),
                        startHour: '10:00',
                        endHour: '12:00'
                    }
                ]
            };

            const client = await getClientByDocumentId(documentId);
            await updateClientById(client._id.toString(), updatedData);

            const updatedClient = await getClientByDocumentId(documentId);

            expect(updatedClient).toMatchObject({
                _id: expect.any(ObjectId),
                name: 'Jane Doe',
                clientSchedule: [
                    {
                        date: new Date(2025, 7, 12),
                        startHour: '10:00',
                        endHour: '12:00'
                    }
                ],
                documentId,
                age: 25,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            });
        });

        it ('should throw an error if the client is not found', async () => {
            const id = 'nonexistentId';
            const updatedData = {
                name: 'Jane Doe',
                age: 25,
                clientSchedule: [
                    {
                        date: new Date(2025, 7, 12),
                        startHour: '10:00',
                        endHour: '12:00'
                    }
                ]
            };

            await expect(updateClientById(id, updatedData)).rejects.toThrow(AppError);
        });
    });
});