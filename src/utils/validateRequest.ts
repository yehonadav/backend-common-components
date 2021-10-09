import {Schema} from "joi";
import {validationError} from "../errors/validationError";

const options = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true // remove unknown props
};

export function validateRequest(requestBody:any, schema:Schema)
{
  const { error, value } = schema.validate(requestBody, options);

  if (error)
    throw validationError(error);

  return value;
}