import jwt from "jsonwebtoken";
import {safeStringify} from "@yehonadav/safestringify";
import {ApiError} from "../../utils/ApiError";
import {statusCode} from "@yehonadav/statuscodes";
import {JWT_SECRET} from "../variables/JWT_SECRET";


export const verifyJwt = (token:string) => {
  try {
    jwt.verify( token, JWT_SECRET, {algorithms: ['HS256'] });
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