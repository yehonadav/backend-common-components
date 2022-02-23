import { Schema, Document, Connection, Model } from 'mongoose'
import { accountsCollectionName } from './accounts'

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

export const refreshTokensSchema = new Schema({
  account: { type: Schema.Types.ObjectId, ref: accountsCollectionName, required: true, index: true },
  token: { type: String, required: true, unique: true, index: true },
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

export const createRefreshTokensModel = (conn:Connection):Model<RefreshTokensDocument> => {
  // Note: OverwriteModelError: Cannot overwrite `Accounts` model once compiled. error
  return (
    conn.models.refreshToken
    ||
    conn.model<RefreshTokensDocument>('refreshToken', refreshTokensSchema)
  );
}