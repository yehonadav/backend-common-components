import jwt, {SignOptions} from 'jsonwebtoken';
import {AccountsDocument} from "../../models/accounts/accounts";
import {getEnvironmentVariable} from "application-common-components";

export interface IJwtTokenDTO {
  sub?: string;
  id: string;
  role: string;
}

export const jwtOptions:SignOptions = {
  expiresIn: '15m'
}

const JWT_SECRET = getEnvironmentVariable('JWT_SECRET');

export function generateJwtToken(account:AccountsDocument):string {
  const payload: IJwtTokenDTO = {
    sub: account.id,
    id: account.id,
    role: account.role,
  }

  return jwt.sign(
    payload,
    JWT_SECRET,
    jwtOptions,
  );
}