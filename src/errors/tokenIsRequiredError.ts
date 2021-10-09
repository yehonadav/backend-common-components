import {ApiError} from "../utils/ApiError";
import {statusCode} from "@yehonadav/statuscodes";

export const tokenIsRequiredError = new ApiError({
  statusCode: statusCode.badRequest,
  message: "Token is required",
});