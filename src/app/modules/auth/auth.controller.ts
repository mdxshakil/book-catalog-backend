import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  ILoginUserResponse,
  IPersistUserResponse,
  ISignupUserResponse,
  IUser,
} from "./auth.interface";
import httpStatus from "http-status";
import ApiError from "../../../errors/apiError";
import config from "../../../config";
import { AuthService } from "./auth.services";

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body;

    const result = await AuthService.createUser(userData);
    if (!result?.accessToken) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Signup failed");
    }

    sendResponse<ISignupUserResponse>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Signup successful",
      data: result,
    });
  }
);

const loginUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userLoginData = req.body;
    const result = await AuthService.loginUser(userLoginData);

    if (!result?.accessToken) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Login failed");
    }

    sendResponse<ILoginUserResponse>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Login successful",
      data: result,
    });
  }
);

const persistUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const accessToken = req.headers.authorization || "";

    const result = await AuthService.persistUser(accessToken);

    sendResponse<IPersistUserResponse>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Login successful",
      data: result,
    });
  }
);

export const AuthController = {
  createUser,
  loginUser,
  persistUser,
};
