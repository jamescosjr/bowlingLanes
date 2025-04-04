class AppError extends Error {
    constructor(message = "something went wrong", status) {
        super(message);
        this.status = status || 500;
        this.isOperational = true;
    }
}

class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
        super(message, 404);
    }
}

class ValidationError extends AppError {
    constructor(message = "Invalid data") {
        super(message, 400);
    }
}

module.exports = {
    AppError,
    NotFoundError,
    ValidationError,
}
