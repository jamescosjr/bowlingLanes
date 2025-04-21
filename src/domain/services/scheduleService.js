const { createSchedule } = require("../../infrastructure/repositories/scheduleRepositories/scheduleRepositoryWrite.js");
const { getAllSchedules } = require("../../infrastructure/repositories/scheduleRepositories/scheduleRepositoryRead.js");
const { getLaneById } = require("../../infrastructure/repositories/bowlingLaneRepositories/bowlingLaneRepositoryRead.js");
const { getClientById } = require("../../infrastructure/repositories/clientRepositories/clientRepositoryRead.js");
const { AppError, NotFoundError } = require("../erros/customErros.js");
const { normalizeDate,
    integerToStringHour,
} = require("../utils/dates.js");
const { addScheduleOnClient } = require("../../infrastructure/repositories/clientRepositories/clientRepositoryWrite.js");
const { addScheduleOnLane } = require("../../infrastructure/repositories/bowlingLaneRepositories/bowlingLaneRepositoryWrite.js");
const { ObjectId } = require("mongodb");

async function createScheduleService(date, startHour, bowlingLaneId, clientId) {
    try {
    const normalizedDate = normalizeDate(date);
    const normalizedStartHour = integerToStringHour(startHour);
    const endHour = integerToStringHour(startHour + 2);

    const lane = await getLaneById(bowlingLaneId);

    if (!lane) {
        throw new NotFoundError("Lane not found");
    }

    const laneName = lane.name;

    const client = await getClientById(clientId);

    if (!client) {
        throw new NotFoundError("Client not found");
    }

    const clientName = client.name;
    const documentId = client.documentId;


    const clientSchedule = {
        date: normalizedDate,
        startHour: normalizedStartHour,
        endHour,
        bowlingLane: laneName,
        
    }

    await addScheduleOnClient(documentId, clientSchedule );


    const laneSchedule = {
        date: normalizedDate,
        startHour: normalizedStartHour,
        endHour,
        client: clientName,
    }

    await addScheduleOnLane(laneName, laneSchedule);

        return await createSchedule(
            normalizedDate,
            normalizedStartHour,
            endHour,
            clientId,
            bowlingLaneId
        );
    } catch (error) {
        throw new AppError("Failed to create schedule", error);
    }

}

async function getAllSchedulesService() {
    try {
        return await getAllSchedules();
    } catch (error) {
        throw new AppError("Failed to get all schedules", error);
    }
}

module.exports = {
    createScheduleService,
    getAllSchedulesService,
};