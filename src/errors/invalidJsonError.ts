import {ApiError} from "../utils/ApiError";
import {statusCode} from "@yehonadav/statuscodes";

export const invalidJsonError = new ApiError({
  statusCode: statusCode.badRequest,
  message: 'Validation error: Expected valid JSON',
});