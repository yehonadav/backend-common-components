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

  try {
    return await handler(event, context, callback);
  }
  catch (e:any) {
    if (e.message === "Network Error") {
      console.error(e)
      try {
        await connectToDatabase();
        return await handler(event, context, callback);
      }
      catch (e2:any) {
        if (e2.message === "Network Error") {
          console.error(e2)
          throw new Error("Network Error")
        }
        throw e2
      }
    }
    throw e
  }
}