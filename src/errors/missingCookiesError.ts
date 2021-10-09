import {ApiError} from "../utils/ApiError";
import {statusCode} from "@yehonadav/statuscodes";

export const missingCookiesError = new ApiError({
  statusCode: statusCode.forbidden,
  message: "missing cookies"
});