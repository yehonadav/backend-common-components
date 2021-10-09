import {accountDB} from "../../models/accounts/accounts";
import {accountNotFoundError} from "../errors/accountNotFoundError";
import {unauthorizedError} from "../errors/unauthorizedError";
import {getAuthorizationToken} from "../utils/getAuthorizationToken";
import {getJwtPayload} from "../jwt/getJwtPayload";
import {refreshTokenDB} from "../../models/accounts/refreshTokens";
import {LambdaEvent} from "../../types";

export interface IAuthorize {
  event: LambdaEvent;
  roles?: string[];
}

export const authDBAsync = async ({event, roles = []}:IAuthorize) => {
  const token = getAuthorizationToken(event);
  const jwtPayload = getJwtPayload(token);

  const account = await accountDB.findById(jwtPayload.id);

  if (!account)
    throw accountNotFoundError;

  const refreshTokens = await refreshTokenDB.find({ account: account.id });

  if (!account || (roles.length && !roles.includes(account.role)))
    // account no longer exists or role not authorized
    throw unauthorizedError;

  return {
    account,
    jwtPayload,
    ownsToken: (token: any) => !!refreshTokens.find(x => x.token === token),
  };
}