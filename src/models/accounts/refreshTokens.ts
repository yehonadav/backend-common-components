// mandatory for every model to ensure instantiation
import "../mongoose-db";

import {Schema, Document, models, model} from 'mongoose';
import {accountDB} from "./accounts";

export type RefreshTokensDocument = Document & {
  account: Schema.Types.ObjectId;
  token: string;
  expires: Date;
  created: Date;
  createdByIp: string;
  revoked: Date;
  revokedByIp: string;
  replacedByToken: string;
  isExpired: boolean;
  isActive: boolean;
};

const refreshTokensSchema = new Schema({
  account: { type: Schema.Types.ObjectId, ref: accountDB.collection.name, required: true},
  token: { type: String, required: true, unique: true },
  expires: Date,
  created: { type: Date, default: Date.now },
  createdByIp: String,
  revoked: Date,
  revokedByIp: String,
  replacedByToken: String
});

refreshTokensSchema.virtual('isExpired').get(function () {
  // @ts-ignore
  return Date.now() >= (new Date(this.expires)).getTime();
});

refreshTokensSchema.virtual('isActive').get(function () {
  // @ts-ignore
  return !this.revoked && !this.isExpired;
});

export const refreshTokenDB = (models.refreshToken ||
  model<RefreshTokensDocument>('refreshToken', refreshTokensSchema)
);