import {ApiError} from "../utils/ApiError";
import {statusCode} from "@yehonadav/statuscodes";

export const emailAlreadyRegisteredError = (email:string) => new ApiError({
  statusCode: statusCode.badRequest,
  message: `Email "${email}" is already registered`
});