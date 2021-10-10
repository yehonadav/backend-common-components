import jwt, {SignOptions} from 'jsonwebtoken';
import {AccountsDocument} from "../../models/accounts/accounts";
import {JWT_SECRET} from "../variables/JWT_SECRET";

export interface IJwtTokenDTO {
  sub?: string;
  id: string;
  role: string;
}

export const jwtOptions:SignOptions = {
  expiresIn: '15m'
}

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