export class AppError extends Error {
    status: number;

    constructor(message: string, status = 500) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export class AuthenticationError extends AppError {
    constructor(message = "Authentication required") {
        super(message, 401);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized") {
        super(message, 403);
    }
}

export class NotFoundError extends AppError {
    constructor(resource = "Resource", message?: string) {
        super(message || `${resource} not found`, 404);
        this.resource = resource;
    }

    resource: string;
}

export class ProjectNotFoundError extends NotFoundError {
    constructor(message?: string) {
        super("Project", message);
    }
}

export class DuplicateProjectError extends AppError {
    constructor(message = "Project name already in use") {
        super(message, 400);
    }
}

export class RepositoryNotFoundError extends NotFoundError {
    constructor(message?: string) {
        super("Repository", message);
    }
}

export class DuplicateRepositoryError extends AppError {
    constructor(message = "Repository name already in use") {
        super(message, 400);
    }
}

export class ContentNotFoundError extends NotFoundError {
    constructor(message?: string) {
        super("Content", message);
    }
}

export class UserNotFoundError extends NotFoundError {
    constructor(message?: string) {
        super("User", message);
    }
}

export class DuplicateUserError extends AppError {
    constructor(message = "Username is already in use") {
        super(message, 400);
    }
}

export class ValidationError extends AppError {
    constructor(message = "Validation error") {
        super(message, 400);
    }
}
