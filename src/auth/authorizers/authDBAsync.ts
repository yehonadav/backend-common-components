import {accountNotFoundError} from "../errors/accountNotFoundError";
import {unauthorizedError} from "../errors/unauthorizedError";
import {getAuthorizationToken} from "../utils/getAuthorizationToken";
import {getJwtPayload} from "../jwt/getJwtPayload";
import {LambdaEvent} from "../../types";

export interface IAuthorize {
  event: LambdaEvent;
  roles?: string[];
}

export interface ICreateAuthDbParams {
  getAccountByIdAsync(id: string):Promise<{id:string; role:string;}|null>; // await accountDB.findById(jwtPayload.id)
  getAccountRefreshTokensByAccountId(id: string):Promise<{token:string}[]>; // await refreshTokenDB.find({ account: account.id })
}

export const createAuthDBAsync = (
  {
    getAccountByIdAsync,
    getAccountRefreshTokensByAccountId,
  }:ICreateAuthDbParams) =>
  async ({event, roles = []}:IAuthorize) => {
  const token = getAuthorizationToken(event);
  const jwtPayload = getJwtPayload(token);

  const account = await getAccountByIdAsync(jwtPayload.id);

  if (!account)
    throw accountNotFoundError;

  const refreshTokens = await getAccountRefreshTokensByAccountId(account.id);

  if (!account || (roles.length && !roles.includes(account.role)))
    // account no longer exists or role not authorized
    throw unauthorizedError;

  return {
    account,
    jwtPayload,
    ownsToken: (token: any) => !!refreshTokens.find(x => x.token === token),
  };
}