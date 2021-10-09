import {getEventPathAccountId} from "./getEventPathAccountId";
import {objectId} from "../objectId";
import {LambdaEvent} from "../../types";

export const getEventPathAccountObjectId = (event: LambdaEvent) => {
  return objectId(getEventPathAccountId(event));
}