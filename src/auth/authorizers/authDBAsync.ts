import {accountNotFoundError} from "../errors/accountNotFoundError";
import {unauthorizedError} from "../errors/unauthorizedError";
import {getAuthorizationToken} from "../utils/getAuthorizationToken";
import {getJwtPayload} from "../jwt/getJwtPayload";
import {LambdaEvent} from "../../types";
import { Model } from 'mongoose'
import { AccountsDocument, RefreshTokensDocument } from '../../models'

export interface IAuthorize {
  event: LambdaEvent;
  roles?: string[];
  db: IAuthDB;
}

export interface IAuthDB {
  accounts: Model<AccountsDocument>;
  refreshTokens: Model<RefreshTokensDocument>;
}

export const authDBAsync = async ({db, event, roles = []}:IAuthorize) => {
  const token = getAuthorizationToken(event);
  const jwtPayload = getJwtPayload(token);

  const account = await db.accounts.findById(jwtPayload.id);

  if (!account)
    throw accountNotFoundError;

  const refreshTokens = await db.refreshTokens.find({ account: account.id });

  if (!account || (roles.length && !roles.includes(account.role)))
    // account no longer exists or role not authorized
    throw unauthorizedError;

  return {
    account,
    jwtPayload,
    ownsToken: (token: any) => !!refreshTokens.find(x => x.token === token),
  };
}