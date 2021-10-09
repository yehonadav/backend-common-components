import {ApiError} from "../utils/ApiError";
import {statusCode} from "@yehonadav/statuscodes";

export const missingCookieError = (cookie:string) => new ApiError({
  statusCode: statusCode.forbidden,
  message: `missing cookie ${cookie}`
});