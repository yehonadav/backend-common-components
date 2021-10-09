import {missingIpError} from "../../errors/missingIpError";

export const getEventIp = (event:any):string => {
  const ipAddress = event['requestContext']['identity']['sourceIp'];

  if (!ipAddress)
    throw missingIpError;

  return ipAddress;
}