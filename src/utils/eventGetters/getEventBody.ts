import {invalidJsonError} from "../../errors/invalidJsonError";
import {LambdaEvent} from "../../types";

export const getEventBody = <T=any>(event: LambdaEvent):T => {
  try {
    return JSON.parse(event.body);
  }
  catch (e) {
    throw invalidJsonError
  }
}