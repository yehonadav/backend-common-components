import {authJwt} from "./authJwt";
import {getEventPathAccountId} from "../../utils/eventGetters/getEventPathAccountId";
import {unauthorizedError} from "../errors/unauthorizedError";
import {LambdaEvent} from "../../types";

export const authOwnerPath = (event: LambdaEvent) => {
  const jwtPayload = authJwt(event);
  const accountId = getEventPathAccountId(event);

  if (jwtPayload.id !== accountId)
    throw unauthorizedError;

  return jwtPayload;
}