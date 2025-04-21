const mongoose = require('mongoose');

const collectionName = 'schedules';

const scheduleSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    startHour: {
        type: String,
        required: true,
    },
    endHour: {
        type: String,
        required: true,
    },
    bowlingLane: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bowlingLanes',
        required: true,
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clients',
        required: true,
    },
}, { timestamps: true });

const Schedule = mongoose.model(collectionName, scheduleSchema);
module.exports = Schedule;