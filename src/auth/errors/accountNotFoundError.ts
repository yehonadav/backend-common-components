import {ApiError} from "../../utils/ApiError";
import {statusCode} from "@yehonadav/statuscodes";

export const accountNotFoundError = new ApiError({
  statusCode: statusCode.notFound,
  message: 'Account not found',
});