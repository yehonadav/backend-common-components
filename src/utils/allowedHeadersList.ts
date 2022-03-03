import {getEnvironmentVariable} from "application-common-components";

let ACCESS_CONTROL_ALLOW_HEADERS:string;

export const getAccessControlAllowHeaders = () => {
  if (!ACCESS_CONTROL_ALLOW_HEADERS)
    ACCESS_CONTROL_ALLOW_HEADERS = getEnvironmentVariable('ACCESS_CONTROL_ALLOW_HEADERS');

  return ACCESS_CONTROL_ALLOW_HEADERS;
}
