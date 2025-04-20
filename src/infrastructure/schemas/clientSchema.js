const mongoose = require('mongoose');

const collectionName = 'clients';

const clientScheduleSchema = new mongoose.Schema({
    _id: false,
    date: { type: Date, required: true },
    startHour: { type: String, required: true },
    endHour: { type: String, required: true },
    bowlingLane: { type: String, required: true } 
});

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    clientSchedule: {
        type: [clientScheduleSchema],
        default: []
    },
    documentId: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    }

}, { timestamps: true });

const Client = mongoose.model(collectionName, clientSchema);

module.exports = Client;