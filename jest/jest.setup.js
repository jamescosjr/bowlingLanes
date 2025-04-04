const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server-core');

let mongo;

const connect = async () => {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();

    await mongoose.connect(uri, {});
};

const closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
};

const clearDatabase = async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
};

module.exports = { connect, closeDatabase, clearDatabase }