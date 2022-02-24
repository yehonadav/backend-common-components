import {accountNotFoundError} from "../errors/accountNotFoundError";
import {unauthorizedError} from "../errors/unauthorizedError";
import {LambdaEvent} from "../../types";
import { Model } from 'mongoose'
import { AccountsDocument, RefreshTokensDocument } from '../../models'
import { authJwt } from './authJwt'

export interface IAuthDB {
  accounts: Model<AccountsDocument>;
  refreshTokens: Model<RefreshTokensDocument>;
}

export interface IAuthDbByJwtPayloadIdAsync {
  jwtPayloadId: string;
  roles?: string[];
  db: IAuthDB;
}

export const authDbByJwtPayloadIdAsync = async ({db, jwtPayloadId, roles = []}:IAuthDbByJwtPayloadIdAsync) => {
  const account = await db.accounts.findById(jwtPayloadId);

  if (!account)
    throw accountNotFoundError;

  const refreshTokens = await db.refreshTokens.find({ account: account.id });

  if (!account || (roles.length && !roles.includes(account.role)))
    // account no longer exists or role not authorized
    throw unauthorizedError;

  return {
    account,
    ownsToken: (token: any) => !!refreshTokens.find(x => x.token === token),
  };
}

export interface IAuthorize {
  event: LambdaEvent;
  roles?: string[];
  db: IAuthDB;
}

export const authDBAsync = async ({db, event, roles = []}:IAuthorize) => {
  const jwtPayload = authJwt(event);
  return {
    jwtPayload,
    ...authDbByJwtPayloadIdAsync({db, jwtPayloadId: jwtPayload.id, roles})
  };
}