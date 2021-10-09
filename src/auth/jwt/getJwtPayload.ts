import jsonwebtoken from 'jsonwebtoken';
import { safeStringify } from '@yehonadav/safestringify';
import { apiError, ApiError } from '../../utils/ApiError';
import { statusCode } from '@yehonadav/statuscodes';
import { IJwtTokenDTO } from './generateJwtToken';
import { verifyJwt } from './verifyJwt';

export const getJwtPayload = (token:string):IJwtTokenDTO => {
  verifyJwt(token);

  let payload;

  try {
    payload = jsonwebtoken.decode(token, { complete:true })?.payload;
  } catch (e) {
    const errorMessage = safeStringify(e);
    console.error(`authorize token decode failed: ${errorMessage}`);
    throw new ApiError({
      statusCode: statusCode.unauthorized,
      message: errorMessage,
    });
  }

  if (!payload) {
    throw apiError({
      statusCode: statusCode.unauthorized,
      message: 'token decoding failure',
    });
  }

  if (!payload.id) {
    throw apiError({
      statusCode: statusCode.unauthorized,
      message: 'token is missing an account id',
    });
  }

  if (!payload.role) {
    throw apiError({
      statusCode: statusCode.unauthorized,
      message: 'token is missing an account role',
    });
  }

  return {
    id: payload.id,
    role: payload.role,
    sub: payload.sub,
  };
};
