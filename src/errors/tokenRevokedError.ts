import {statusCode} from "@yehonadav/statuscodes";
import {ApiError} from "../utils/ApiError";

export const tokenRevokedError = new ApiError({
  statusCode: statusCode.unauthorized,
  message: 'token revoked',
})