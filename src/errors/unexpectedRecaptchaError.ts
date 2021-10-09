import {ApiError} from "../utils/ApiError";
import {statusCode} from "@yehonadav/statuscodes";

export const unexpectedRecaptchaError = new ApiError({
  statusCode: statusCode.internalServerError,
  message: "unexpected recaptcha error",
});
