import {Context} from "aws-lambda";
import {HttpResponse, httpResponse} from "./httpResponse";
import {Callback} from "aws-lambda/handler";
import {objectifyError} from "@yehonadav/safestringify";
import {ApiError} from "../ApiError";
import {statusCode} from "@yehonadav/statuscodes";

export type AsyncHandler<TEvent = any, TResult = any> = (
  event: TEvent,
  context: Context,
  callback: Callback<TResult>,
) => Promise<HttpResponse>;

export const createHandler = <TEvent = any, TResult = any> (handler:AsyncHandler<TEvent, TResult>):AsyncHandler<TEvent, TResult> => async (
  event: TEvent,
  context: Context,
  callback: Callback<TResult>,
) =>
{
  const section = context.functionName;

  console.log({
    section,
  });

  try {
    return await handler(event, context, callback);
  }

  catch (e:any) {
    const error = e as ApiError;
    let response:HttpResponse;

    if (error.isApiError)
      response = httpResponse({
        statusCode: e.statusCode,
        body: {
          message: e.message,
        }
      });

    else
      response = httpResponse({
        statusCode: statusCode.internalServerError,
        body: {
          message: e.message,
        }
      });

    console.error({
      section,
      error: objectifyError(e)
    });

    return response;
  }
}