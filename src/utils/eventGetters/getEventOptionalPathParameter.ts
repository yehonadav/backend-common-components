import {LambdaEvent} from "../../types";

export const getEventOptionalPathParameter = (event: LambdaEvent, parameter:string):string|undefined => {
  return event.pathParameters?.[parameter];
}