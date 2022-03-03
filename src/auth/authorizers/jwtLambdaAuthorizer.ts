import {AuthResponse, Callback, Context, PolicyDocument} from "aws-lambda";
import {APIGatewayTokenAuthorizerEvent} from "aws-lambda/trigger/api-gateway-authorizer";
import {JwtPayload, verify} from "jsonwebtoken";
import { getEnvironmentVariable } from 'application-common-components'

export const generateLambdaAuthorizerPolicyDocument = (effect:string, methodArn:string):PolicyDocument => ({
  Version: "2012-10-17",
  Statement: [
    {
      Action: "execute-api:Invoke",
      Effect: effect,
      Resource: methodArn
    }
  ]
});

export const generateLambdaAuthorizerResponse = (payload:JwtPayload, effect:string, methodArn:string):AuthResponse => ({
  context: payload, // accessible from context.authorizer.[payload key]
  principalId: payload.id, // accessible from event.requestContext.authorizer.principalId
  policyDocument: generateLambdaAuthorizerPolicyDocument(effect, methodArn),
});

// use getEventAuthorizer to get the JwtPayload
export const jwtLambdaAuthorizerHandler = (event:APIGatewayTokenAuthorizerEvent, _context: Context, callback:Callback):void => {
  const token = event.authorizationToken.replace("Bearer ", "");
  const methodArn = event.methodArn;

  if (!token || !methodArn)
    return callback(null, "Unauthorized");

  let decoded: JwtPayload;

  const JWT_SECRET = getEnvironmentVariable('JWT_SECRET');

  try {
    decoded = verify(token, JWT_SECRET, {algorithms: ['HS256'] }) as JwtPayload;
  } catch (e) {
    return callback(null, generateLambdaAuthorizerResponse({id:""}, "Deny", methodArn));
  }

  if (!decoded.id)
    return callback(null, generateLambdaAuthorizerResponse(decoded || {id:""}, "Deny", methodArn));

  return callback(null, generateLambdaAuthorizerResponse(decoded, "Allow", methodArn));
};
