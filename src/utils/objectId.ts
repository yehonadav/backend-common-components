import {Types} from "mongoose";
import {invalidIdError} from "../errors/invalidIdError";

export type ObjectId = Types.ObjectId;

export function objectId(id: string): ObjectId {
  try {
    return Types.ObjectId(id)
  } catch (e) {
    throw invalidIdError
  }
}

export function isObjectId(id: string): boolean {
  return Types.ObjectId.isValid(id);
}