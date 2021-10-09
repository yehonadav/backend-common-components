import {apiError} from "../ApiError";
import {statusCode} from "@yehonadav/statuscodes";
import {isValidObjectId} from "mongoose";
import {getEventPathParameter} from "./getEventPathParameter";
import {LambdaEvent} from "../../types";

export const getEventPathAccountId = (event: LambdaEvent):string => {
  const accountId:string = getEventPathParameter(event, "accountId");

  if (!isValidObjectId(accountId))
    throw apiError({
      statusCode: statusCode.badRequest,
      message: `invalid path parameter accountId`,
    })

  return accountId;
}