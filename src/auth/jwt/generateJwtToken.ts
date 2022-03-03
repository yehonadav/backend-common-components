import jwt, {SignOptions} from 'jsonwebtoken';
import {AccountsDocument} from "../../models/accounts/accounts";
import { getEnvironmentVariable } from 'application-common-components'

export interface IJwtTokenDTO {
  sub?: string;
  id: string;
  role: string;
}

export const jwtOptions:SignOptions = {
  expiresIn: process.env.JWT_EXPIRES_IN || '15m'
}

export function generateJwtToken(account:AccountsDocument):string {
  const payload: IJwtTokenDTO = {
    sub: account.id,
    id: account.id,
    role: account.role,
  }

  return jwt.sign(
    payload,
    getEnvironmentVariable('JWT_SECRET'),
    jwtOptions,
  );
}