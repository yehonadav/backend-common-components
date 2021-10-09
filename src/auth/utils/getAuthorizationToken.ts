import {getEventHeader} from '../../utils/eventGetters/getEventHeader';
import {missingAuthorizationTokenError} from '../errors/missingAuthorizationTokenError';
import {authorizationFormatError} from '../errors/authorizationFormatError';
import {LambdaEvent} from '../../types';

export const getTokenFromAuthorization = (authorization:string) => {
  if (!authorization) {
    throw missingAuthorizationTokenError;
  }

  const authorizationSplit = authorization.split(' ');

  if (authorizationSplit.length !== 2) {
    throw authorizationFormatError;
  }

  const [scheme, token] = authorizationSplit;

  if (!/^Bearer$/i.test(scheme)) {
    throw authorizationFormatError;
  }

  if (!token) {
    throw missingAuthorizationTokenError;
  }

  return token;
}

export const getAuthorizationToken = (event: LambdaEvent):string => {
  const authorization = getEventHeader(event, 'Authorization');
  return getTokenFromAuthorization(authorization);
};
