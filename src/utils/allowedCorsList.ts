import {getEnvironmentVariable} from "application-common-components";

export const CORS = getEnvironmentVariable('CORS').split(",");

if (CORS.length === 0)
  throw "process.env.CORS origin list cannot be empty";

if (!CORS[0].startsWith("https://www."))
  console.warn("default cor origin CORS[0] domain not starting with 'https://www.', " +
                       "make sure not to give away an origin you want to protect.");
