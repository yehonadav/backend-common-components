import {ApiError} from "../../utils/ApiError";
import {statusCode} from "@yehonadav/statuscodes";

export const missingAuthorizationTokenError = new ApiError({
  statusCode: statusCode.unauthorized,
  message: 'missing authorization token',
});