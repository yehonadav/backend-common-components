import {ApiError} from "../../utils/ApiError";
import {statusCode} from "@yehonadav/statuscodes";

export const unauthorizedError = new ApiError({statusCode: statusCode.unauthorized, message: 'Unauthorized'});