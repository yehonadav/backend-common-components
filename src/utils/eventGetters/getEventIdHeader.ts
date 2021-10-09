import {apiError} from "../ApiError";
import {statusCode} from "@yehonadav/statuscodes";
import {isValidObjectId} from "mongoose";
import {getEventHeader} from "./getEventHeader";
import {LambdaEvent} from "../../types";

export const getEventIdHeader = (event: LambdaEvent):string => {
  const eventId:string = getEventHeader(event, "Event-Id");

  if (!isValidObjectId(eventId))
    throw apiError({
      statusCode: statusCode.badRequest,
      message: `missing Event-Id header`,
    })

  return eventId;
}