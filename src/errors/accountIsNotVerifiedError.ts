import {ApiError} from "../utils/ApiError";
import {statusCode} from "@yehonadav/statuscodes";

export const accountIsNotVerifiedError = new ApiError({
  statusCode: statusCode.badRequest,
  message: 'Account is not verified, please check for verification link in your email'
});