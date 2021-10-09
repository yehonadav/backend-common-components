import {statusCode} from "@yehonadav/statuscodes";
import {ApiError} from "../utils/ApiError";

export const incorrectLoginCredentialsError = new ApiError({
  statusCode: statusCode.badRequest,
  message: 'login credentials are incorrect'
});