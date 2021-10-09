import {apiError} from "../ApiError";
import {statusCode} from "@yehonadav/statuscodes";
import {isValidObjectId} from "mongoose";
import {getEventHeader} from "./getEventHeader";
import {LambdaEvent} from "../../types";

export const getEventOwnerHeader = (event: LambdaEvent):string => {
  const accountId:string = getEventHeader(event, "Owner-Id");

  if (!isValidObjectId(accountId))
    throw apiError({
      statusCode: statusCode.badRequest,
      message: `missing Owner-Id header`,
    })

  return accountId;
}