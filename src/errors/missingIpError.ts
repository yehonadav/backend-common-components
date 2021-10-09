import {ApiError} from "../utils/ApiError";
import {statusCode} from "@yehonadav/statuscodes";

export const missingIpError = new ApiError({
  statusCode: statusCode.forbidden,
  message: "missing ip address",
});

