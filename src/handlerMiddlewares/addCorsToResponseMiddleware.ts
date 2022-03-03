import {AsyncHandler} from "../utils/http/createHttpHandler";
import {getCORS} from "../utils/allowedCorsList";

export const addCorsToResponseMiddleware = (handler:AsyncHandler):AsyncHandler => async (
  event,
  context,
  callback,
) =>
{
  const response = await handler(event, context, callback);

  const origin = event.headers?.origin;

  if (getCORS().includes(origin)) {
    if (!response.headers)
      response.headers = {};

    response.headers = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': true,
      ...response.headers,
    };
  }

  return response;
}