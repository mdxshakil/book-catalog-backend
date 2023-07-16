import express from "express";
import { AuthController } from "./auth.controller";
const router = express.Router();

router.post("/signup", AuthController.createUser);

router.post("/login", AuthController.loginUser);

router.post("/persist-user", AuthController.persistUser);

export const AuthRoutes = router;
