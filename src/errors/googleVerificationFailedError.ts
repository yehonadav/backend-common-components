import {ApiError} from "../utils/ApiError";

export const googleVerificationFailedError = new ApiError({
  statusCode: 500,
  message: "google verification failed"
})