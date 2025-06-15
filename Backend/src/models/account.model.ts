import mongoose, { Document, Schema, Model } from "mongoose";
import {
  accountProviderConfig,
  AccountProviderEnum,
} from "../config/accountProvider.config";

export interface IAccount extends Document {
  provider: AccountProviderEnum;
  providerId: string;
  userId: Schema.Types.ObjectId;
  refreshToken: string | null;
  tokenExpiry: Date | null;
  createdAt: Date;
}

const AccountSchema = new Schema<IAccount>(
  {
    provider: {
      type: String,
      required: true,
      enum: Object.values(accountProviderConfig),
    },
    providerId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    tokenExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        // Remove the refreshToken field and field from the output
        delete ret.refreshToken;
        return ret;
      },
    },
  }
);

const AccountModel:Model<IAccount> = mongoose.model<IAccount>("Account", AccountSchema);

export default AccountModel;
