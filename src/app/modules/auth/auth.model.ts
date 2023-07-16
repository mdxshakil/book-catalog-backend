import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../../config";
import { AuthModel, IUser, IUserMethods } from "./auth.interface";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";

const authSchema = new Schema<IUser, Record<string, never>, IUserMethods>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    }
  },
  {
    timestamps: true,
  }
);

//hash password before saving
authSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  this.password = hashedPassword;
  next();
});

//check user exists or not before login
authSchema.methods.isUserExists = async function (
  email: string
): Promise<Partial<IUser> | null> {
  const user = await User.findOne(
    { email },
    { password: 1, email: 1, name: 1 }
  );
  return user;
};

//check password valid or not before login
authSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(givenPassword, savedPassword);
  return isMatch;
};

export const User = model<IUser, AuthModel>("User", authSchema);
