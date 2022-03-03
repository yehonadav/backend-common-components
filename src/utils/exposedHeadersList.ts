import {getEnvironmentVariable} from "application-common-components";

let ACCESS_CONTROL_EXPOSE_HEADERS:string;

export const getAccessControlExposeHeaders = () => {
  if (!ACCESS_CONTROL_EXPOSE_HEADERS)
    ACCESS_CONTROL_EXPOSE_HEADERS = getEnvironmentVariable('ACCESS_CONTROL_EXPOSE_HEADERS');
  return ACCESS_CONTROL_EXPOSE_HEADERS;
}
