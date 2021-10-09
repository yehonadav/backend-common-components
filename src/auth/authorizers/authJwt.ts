import { getAuthorizationToken } from '../utils/getAuthorizationToken';
import { getJwtPayload } from '../jwt/getJwtPayload';
import { LambdaEvent } from '../../types';

export const authJwt = (event: LambdaEvent) => {
  const token = getAuthorizationToken(event);
  return getJwtPayload(token);
};
