import { ObjectId } from './utils/objectId';

export type LambdaEvent = any;

export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
export type JsonObject = Record<string, Json>;

export type Owner = ObjectId;