import crypto from "crypto";

export function randomTokenString() {
  return crypto.randomBytes(40).toString('hex');
}

export type CreateToken = (params?:{
  size?: number,
  encoding?: 'ascii'|'utf8'|'ucs2'|'base64'|'binary'|'hex',
}) => string;

export const createToken:CreateToken = ({ size=128, encoding='hex' }={size:128, encoding:'hex'}) => {
  return crypto.randomBytes(size).toString(encoding)
}