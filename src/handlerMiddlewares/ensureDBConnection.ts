import {AsyncHandler} from "../utils/http/createHttpHandler";
import {connectToDatabase, isDatabaseConnected} from "../models/mongoose-db";

export const ensureDBConnection = (handler:AsyncHandler):AsyncHandler => async (
  event,
  context,
  callback,
) =>
{
  if (!isDatabaseConnected())
    await connectToDatabase();

  return await handler(event, context, callback);
}