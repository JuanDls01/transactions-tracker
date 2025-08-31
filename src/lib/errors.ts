export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'User not authenticated') {
    super(message, 401, 'AUTHENTICATION_ERROR');
    this.name = 'AuthenticationError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, originalError?: Error) {
    super(message, 500, 'DATABASE_ERROR');
    this.name = 'DatabaseError';
    this.cause = originalError;
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export class ConnectionError extends AppError {
  constructor(message: string = 'Database connection failed', originalError?: Error) {
    super(message, 503, 'CONNECTION_ERROR');
    this.name = 'ConnectionError';
    this.cause = originalError;
  }
}

export function isConnectionError(error: unknown): boolean {
  if (error instanceof Error) {
    // Prisma connection errors
    if (error.message.includes('Can\'t connect to database') ||
        error.message.includes('Connection timed out') ||
        error.message.includes('ECONNREFUSED') ||
        error.message.includes('ETIMEDOUT') ||
        error.message.includes('connection pool timeout') ||
        error.message.includes('server closed the connection unexpectedly')) {
      return true;
    }
  }
  return false;
}
