import {statusCode} from "@yehonadav/statuscodes";
import {ApiError} from "../utils/ApiError";

export const tokenExpiredError = new ApiError({
  statusCode: statusCode.unauthorized,
  message: 'token expired',
});