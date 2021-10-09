import {authJwt} from "./authJwt";
import {unauthorizedError} from "../errors/unauthorizedError";
import {getEventOwnerHeader} from "../../utils/eventGetters/getEventOwnerHeader";
import {LambdaEvent} from "../../types";

export const authOwnerHeader = (event: LambdaEvent) => {
  const jwtPayload = authJwt(event);
  const accountId = getEventOwnerHeader(event);

  if (jwtPayload.id !== accountId)
    throw unauthorizedError;

  return jwtPayload;
}