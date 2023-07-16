import { Types } from "mongoose";
import { Model } from "mongoose";

export type IUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  user:Partial<IUser>
};
export type ISignupUserResponse = {
  accessToken: string;
  user:Partial<IUser>
};

export type IPersistUserResponse = {
  user:Partial<IUser>
};

export type ILoginUser = {
  email: string;
  password: string;
};

export type IUserMethods = {
  isUserExists(email: string): Promise<Partial<IUser> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};

export type AuthModel = Model<IUser, Record<string, unknown>, IUserMethods>;
