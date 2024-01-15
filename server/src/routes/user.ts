import { Router } from "express";
import { User } from "../controller/userController";

export const userRouter = Router();
const userController = new User();

userRouter.post("/user", userController.createUser);

userRouter.get("/user", userController.getUser);
