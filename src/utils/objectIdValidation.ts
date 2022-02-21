import { isValidObjectId } from 'mongoose';
import { objectId } from './objectId';

const message = 'Invalid Id';

export const objectIdValidation = (value: string, helpers: { error: (arg0: string) => any; }) => {
  if (!isValidObjectId(value)) {
    return helpers.error(message);
  }
  return objectId(value);
};

export const objectIdOptionalValidation = (value: string | undefined, helpers: { error: (arg0: string) => any; }) =>
  value === undefined ? value : objectIdValidation(value, helpers);

export const isObjectIdValidation = (value: string, helpers: { error: (arg0: string) => any; }) => {
  if (!isValidObjectId(value)) {
    return helpers.error(message);
  }
  return value;
};

export const isObjectIdOptionalValidation = (value: string | undefined, helpers: { error: (arg0: string) => any; }) =>
  value === undefined ? value : isObjectIdValidation(value, helpers);