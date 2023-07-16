import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/apiError";
import { jwtHelper } from "../../../shared/jwtHelper";
import {
  ILoginUser,
  ILoginUserResponse,
  IPersistUserResponse,
  ISignupUserResponse,
  IUser,
} from "./auth.interface";
import { User } from "./auth.model";

const createUser = async (
  userData: IUser
): Promise<ISignupUserResponse | null> => {
  const createdUser = await User.create(userData);

  if (!createdUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
  }

  //   create access token
  const { email: userEmail } = createdUser;

  const accessToken = jwtHelper.createToken(
    {
      userEmail,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  //exclude passowrd field
  const signedUser: Partial<IUser> = await User.findOne({
    email: createdUser?.email,
  }).select("-password");

  return { user: signedUser, accessToken };
};

const loginUser = async (
  userLoginData: ILoginUser
): Promise<ILoginUserResponse | null> => {
  const { email, password } = userLoginData;

  const user = new User();
  const isUserExists: Partial<IUser> | null = await user.isUserExists(email);
  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist!");
  }

  // Match password
  if (
    isUserExists?.password &&
    !(await user.isPasswordMatched(password, isUserExists?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect!");
  }

  // Create access token
  const { email: userEmail } = isUserExists;

  const accessToken = jwtHelper.createToken(
    {
      userEmail,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  //exclude passowrd field
  const loggedUser: Partial<IUser> = await User.findOne({
    email: isUserExists?.email,
  }).select("-password");

  return { user: loggedUser, accessToken };
};

const persistUser = async (
  accessToken: string
): Promise<IPersistUserResponse> => {
  const verifiedToken = jwtHelper.verifyToken(
    accessToken,
    config.jwt.secret as Secret
  );
  if (!verifiedToken) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized access");
  }
  return { user: { email: verifiedToken.userEmail } };
};

export const AuthService = {
  createUser,
  loginUser,
  persistUser,
};
