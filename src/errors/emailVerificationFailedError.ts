import {ApiError} from "../utils/ApiError";
import {statusCode} from "@yehonadav/statuscodes";

export const emailVerificationFailedError = new ApiError({
  statusCode: statusCode.badRequest,
  message: 'Verification failed',
});