import {ApiError} from "../utils/ApiError";
import {statusCode} from "@yehonadav/statuscodes";

export const invalidTokenError = new ApiError({
  statusCode: statusCode.unauthorized,
  message: 'invalid token',
})