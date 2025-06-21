import mongoose, { Document, Schema, Model, HydratedDocument } from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";

export interface IUser extends Document {
  name: String;
  email: String;
  password?: String;
  profilePicture?: String | null;
  isActive: Boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date | null;
  currentWorkSpace: Schema.Types.ObjectId | null;
  comparePassword(password: String): Promise<Boolean>;
  omitPassword(): Omit<IUser, "password">;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      select: true, // include password from queries by default
    },
    profilePicture: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    currentWorkSpace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    // Hash the password before saving
    this.password = await hashValue(this.password.toString(), 10);
  }
  next();
});

UserSchema.methods.omitPassword = function (): Omit<IUser, "password"> {
  const user = this.toObject();
  delete user.password;
  return user;
};

UserSchema.methods.comparePassword = async function (
  password: String
): Promise<Boolean> {
  if (!this.password) return false;
  const isMatch = await compareValue(password.toString(), this.password);
  return isMatch;
};

const UserModel:Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
