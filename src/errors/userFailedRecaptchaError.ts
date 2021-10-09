import {ApiError} from "../utils/ApiError";
import {statusCode} from "@yehonadav/statuscodes";

export const userFailedRecaptchaError = new ApiError({
  statusCode: statusCode.badRequest,
  message: "User failed recaptcha",
});
