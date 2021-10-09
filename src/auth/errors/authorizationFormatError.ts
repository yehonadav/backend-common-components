import {ApiError} from "../../utils/ApiError";
import {statusCode} from "@yehonadav/statuscodes";

export const authorizationFormatError = new ApiError({
  statusCode: statusCode.unauthorized,
  message: 'Wrong authorization format, format should be: Bearer {token}',
});