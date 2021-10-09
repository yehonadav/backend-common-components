import {ApiError} from "../utils/ApiError";
import {statusCode} from "@yehonadav/statuscodes";

export const invalidIdError = new ApiError({
  statusCode: statusCode.badRequest,
  message: "Invalid Id",
});