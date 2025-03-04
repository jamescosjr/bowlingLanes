export class AppError extends Error {
    constructor(message = "something went wrong", status) {
        super(message);
        this.status = status || 500;
        this.isOperational = true;
    }
}

export class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
        super(message, 404);
    }
}

export class ValidationError extends AppError {
    constructor(message = "Invalid data") {
        super(message, 400);
    }
}
