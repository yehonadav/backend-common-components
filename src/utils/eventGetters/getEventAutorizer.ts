import {apiError} from "../ApiError";
import {statusCode} from "@yehonadav/statuscodes";
import {JwtPayload} from "jsonwebtoken";

export const getEventAuthorizer = (event:any):JwtPayload => {
  if (!event.requestContext?.authorizer?.id)
    throw apiError({statusCode: statusCode.internalServerError, message: 'missing event authorizer'});

  return event.requestContext.authorizer;
}