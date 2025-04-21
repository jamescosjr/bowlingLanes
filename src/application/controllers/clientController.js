const {
    createClientService,
    getAllClientsService,
    getClientByIdService,
    getClientByDocumentIdService,
} = require('../../domain/services/clientService.js');
const { ValidationError } = require("../../domain/erros/customErros.js");
const { validateClient } = require('../../domain/utils/validations.js');


async function createClientController(req, res, next) {
    try {
        const { name, documentId, age } = req.body;
        const validation = validateClient(name, documentId, age);
        if (!validation.valid) {
            return next(new ValidationError(validation.message));
        }
        const result = await createClientService(name, documentId, age);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

async function getAllClientsController(req, res, next) {
    try {
        const clients = await getAllClientsService();
        res.status(200).json(clients);
    } catch (error) {
        next(error);
    }
}   

async function getClientByIdController(req, res, next) {
    try {
        const { id } = req.params;
        const client = await getClientByIdService(id);
        res.status(200).json(client);
    } catch (error) {
        next(error);
    }
}

async function getClientByDocumentIdController(req, res, next) {
    try {      
        const { documentId } = req.params;
        const client = await getClientByDocumentIdService(documentId);
        res.status(200).json(client);
    } catch (error) {
        next(error);       
    }
}

module.exports = {
    createClientController,
    getAllClientsController,
    getClientByIdController,
    getClientByDocumentIdController,
}