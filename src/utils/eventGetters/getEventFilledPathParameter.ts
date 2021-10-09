import {apiError} from "../ApiError";
import {statusCode} from "@yehonadav/statuscodes";
import {LambdaEvent} from "../../types";

export const getEventFilledPathParameter = (event: LambdaEvent, parameter:string):string => {
  const value:string = event.pathParameters?.[parameter];

  // value can't be empty ''
  if (!value)
    throw apiError({
      statusCode: statusCode.internalServerError,
      message: `missing path parameter ${parameter}`,
    })

  return value;
}