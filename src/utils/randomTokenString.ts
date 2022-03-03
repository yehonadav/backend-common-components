import crypto from "crypto";

export function randomTokenString() {
  return crypto.randomBytes(40).toString('hex');
}

export function createToken(size:number=128):string {
  return crypto.randomBytes(size).toString()
}