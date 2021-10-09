import {ApiError} from "../utils/ApiError";
import {statusCode} from "@yehonadav/statuscodes";
import {ValidationError} from "joi";

export const validationError = (error:ValidationError) =>
  new ApiError({
    statusCode: statusCode.badRequest,
    message: `Validation error: ${error.details.map(x => x.message).join(', ')}`,
  });
