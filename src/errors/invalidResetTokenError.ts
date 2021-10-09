import {ApiError} from "../utils/ApiError";
import {statusCode} from "@yehonadav/statuscodes";

export const invalidResetTokenError = new ApiError({
  statusCode: statusCode.badRequest,
  message: 'Invalid reset token'
});