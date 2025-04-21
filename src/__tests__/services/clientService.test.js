const { 
    createClientService,
    getAllClientsService,
    getClientByIdService,
    getClientByDocumentIdService,
    getClientByScheduleService,
    updateClientByIdService,
    deleteClientByIdService,
} = require('../../domain/services/clientService.js');
const { addScheduleOnClient } = require('../../infrastructure/repositories/clientRepositories/clientRepositoryWrite.js');
const { connect, closeDatabase, clearDatabase } = require('../../../jest/jest.setup.js');
const { AppError } = require('../../domain/erros/customErros.js');

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeDatabase();
});

describe('clientService', () => {
    describe('createClientService', () => {
        it ('should create a client with the given name and schedule', async () => {
            const name = 'John Doe';
            const documentId = '123456789';
            const age = 30;

            const result = await createClientService(name, documentId, age);

            expect(result.toObject()).toMatchObject({
                name,
                documentId,
                age,
                clientSchedule: [],
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            });

            expect(result._id).toBeDefined();
        });

        it ('should throw an error if creation fails', async () => {
            const name = '';
            const documentId = '123456789';
            const age = 30;

            await expect(createClientService(name, documentId, age)).rejects.toThrow(AppError);
        });
    })

    describe('getAllClients', () => {
        it ('should return all clients', async () => {
            const name = 'John Doe';
            const documentId = '123456789';
            const age = 30;

            await createClientService(name, documentId, age);

            const allClients = await getAllClientsService();
            expect(allClients).toHaveLength(1);
            expect(allClients[0].toObject()).toMatchObject({
                name,
                documentId,
                age,
                clientSchedule: [],
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            });
        });

        it ('should return an empty array if there are no clients', async () => {
            const allClients = await getAllClientsService();
            expect(allClients).toHaveLength(0);
        });
    });

    describe('getClientById', () => {
        it ('should return a client by ID', async () => {
            const name = 'John Doe';
            const documentId = '123456789';
            const age = 30;

            const client = await createClientService(name, documentId, age);
            const clientById = await getClientByIdService(client._id);

            expect(clientById.toObject()).toMatchObject({
                name,
                documentId,
                age,
                clientSchedule: [],
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            }); 
        });

        it ('should throw an error if client does not exist', async () => {
            const nonExistentId = 'non-existent-id';

            await expect(getClientByIdService(nonExistentId)).rejects.toThrow(AppError);
        });
    });

    describe('getClientByDocumentId', () => {
        it ('should return a client by document ID', async () => {
            const name = 'John Doe';
            const documentId = '123456789';
            const age = 30;

            const client = await createClientService(name, documentId, age);
            const clientByDocumentId = await getClientByDocumentIdService(documentId);

            expect(clientByDocumentId).toMatchObject({
                name,
                documentId,
                age,
                clientSchedule: [],
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            });
        });

        it ('should throw an error if client does not exist', async () => {
            const nonExistentDocumentId = 'non-existent-document-id';

            await expect(getClientByDocumentIdService(nonExistentDocumentId)).rejects.toThrow(AppError);
        });
    });

        describe('getClientByScheduleService', () => {
            it ('should return a client by schedule', async () => {
                const name = 'John Doe';
                const documentId = '123456789';
                const age = 30;

                await createClientService(name, documentId, age);

                const updatedClientSchedule1 =
                    {
                        date: new Date(2025, 7, 12),
                        startHour: '10:00',
                        endHour: '12:00',
                        bowlingLane: 'Lane 1',
                    }

                await addScheduleOnClient(documentId, updatedClientSchedule1);
                const clientBySchedule = await getClientByScheduleService({ date: updatedClientSchedule1.date, startHour: 10 });

                expect(clientBySchedule[0]).toMatchObject({
                    name,
                    documentId,
                    age,
                    clientSchedule: [
                        {
                            date: updatedClientSchedule1.date,
                            startHour: updatedClientSchedule1.startHour,
                            endHour: updatedClientSchedule1.endHour,
                            bowlingLane: updatedClientSchedule1.bowlingLane,
                        }
                    ],
                    createdAt: expect.any(Date),
                    updatedAt: expect.any(Date),
                });
            });

            it ('should return an empty array if client does not exist', async () => {
                const nonExistentSchedule = {
                    date: new Date(2025, 7, 12),
                    startHour: '10:00',
                    endHour: '12:00',
                    bowlingLane: 'Lane 1',
                };

                const clientBySchedule = await getClientByScheduleService(nonExistentSchedule);

                expect(clientBySchedule).toHaveLength(0);
            });
        });

        describe('updateClientByIdService', () => {
            it ('should update a client by ID', async () => {
                const name = 'John Doe';
                const documentId = '123456789';
                const age = 30;

                const client = await createClientService(name, documentId, age);
                const updatedData = { name: 'Jane Doe', age: 25 };

                await updateClientByIdService(client._id, updatedData);

                const updatedClient = await getClientByIdService(client._id);

                expect(updatedClient).toMatchObject({
                    name: 'Jane Doe',
                    documentId,
                    age: 25,
                    clientSchedule: [],
                    createdAt: expect.any(Date),
                    updatedAt: expect.any(Date),
                });
            });

            it ('should throw an error if client does not exist', async () => {
                const nonExistentId = 'non-existent-id';
                const updatedData = { name: 'Jane Doe', age: 25 };

                await expect(updateClientByIdService(nonExistentId, updatedData)).rejects.toThrow(AppError);
            });
        });

        describe('deleteClientByIdService', () => {
            it ('should delete a client by ID', async () => {
                const name = 'John Doe';
                const documentId = '123456789';
                const age = 30;

                const client = await createClientService(name, documentId, age);

                await deleteClientByIdService(client._id);

                await expect(getClientByIdService(client._id)).rejects.toThrow(AppError);
            });

            it ('should throw an error if client does not exist', async () => {
                const nonExistentId = 'non-existent-id';

                await expect(deleteClientByIdService(nonExistentId)).rejects.toThrow(AppError);
            });
        });
}) ;