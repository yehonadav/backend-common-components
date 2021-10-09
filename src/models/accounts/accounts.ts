import {addModelToDatabase} from "../mongoose-db";
import {Schema, Document, models, model, Model} from 'mongoose';
import {AccountDTO, IsVerified} from "application-common-components";
import {accountRoleDbScheme} from "application-common-components";

export type AccountsDocument = Document & AccountDTO;

const accountsSchema = new Schema({
  email: { type: String, unique: true, required: true },
  phone: { type: String, default: '' },
  passwordHash: { type: String },

  googleId: String,

  role: accountRoleDbScheme,
  verificationToken: String,
  verified: Date,
  resetToken: {
      token: String,
      expires: Date
  },
  passwordReset: Date,

  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  avatar: { type: String, default: '' },
  avatarHd: { type: String, default: '' },
  newsletter: Boolean,

  acceptTerms: Date,

  blocked: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  created: { type: Date, default: Date.now },
  updated: Date,
  lastSeen: { type: Date, default: Date.now },
});

accountsSchema.virtual('isVerified').get(function ():IsVerified {
  // @ts-ignore
  return !!(this.verified || this.passwordReset);
});

accountsSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (_doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.passwordHash;
    }
});

// Note: OverwriteModelError: Cannot overwrite `Accounts` model once compiled. error
export const accountDB: Model<AccountsDocument> = (models.accounts ||
  model<AccountsDocument>('accounts', accountsSchema)
);

addModelToDatabase(accountDB);
