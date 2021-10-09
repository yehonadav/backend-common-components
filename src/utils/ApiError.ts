export interface IApiError {
  statusCode: number;
  message: string;
}

export class ApiError extends Error {
  statusCode: number;
  isApiError = true;

  constructor({statusCode, message}:IApiError) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const apiError = (args:IApiError) => new ApiError(args);