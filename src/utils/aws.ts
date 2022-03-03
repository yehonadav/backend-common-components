import AWS from 'aws-sdk';
import {getEnvironmentVariable} from "application-common-components";

let aws:typeof AWS;

export const getAws = ():typeof AWS => {
  if (!aws) {
    const accessKeyIdAWS = getEnvironmentVariable('accessKeyIdAWS');
    const secretAccessKeyAWS = getEnvironmentVariable('secretAccessKeyAWS');

    const credentials = {
      accessKeyId: accessKeyIdAWS,
      secretAccessKey: secretAccessKeyAWS,
    };

    const region = "us-east-1";

    AWS.config.credentials = credentials;
    AWS.config.region = region;
    aws = AWS;
  }
  return aws;
}