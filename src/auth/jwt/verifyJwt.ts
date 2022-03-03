import jwt from "jsonwebtoken";
import {safeStringify} from "@yehonadav/safestringify";
import {ApiError} from "../../utils/ApiError";
import {statusCode} from "@yehonadav/statuscodes";
import { getEnvironmentVariable } from 'application-common-components'

export const verifyJwt = (token:string) => {
  try {
    jwt.verify( token, getEnvironmentVariable('JWT_SECRET'), {algorithms: ['HS256'] });
  }
  catch (e) {
    const errorMessage = `token verification failed: ${safeStringify(e)}`;
    console.error(errorMessage);
    throw new ApiError({
      statusCode: statusCode.unauthorized,
      message: errorMessage,
    });
  }
}