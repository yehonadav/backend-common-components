import {apiError} from "../ApiError";
import {statusCode} from "@yehonadav/statuscodes";
import {LambdaEvent} from "../../types";

export const getEventHeader = (event: LambdaEvent, header: string): string => {
  const headerValue = event.headers?.[header] || event.headers?.[header.toLowerCase()];

  if (!headerValue)
    throw apiError({
      statusCode: statusCode.badRequest,
      message: `missing header ${header} value`,
    });

  return headerValue
};
