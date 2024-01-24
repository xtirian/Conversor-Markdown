import { Router } from "express";
import { User } from "../controller/userController";
import authUser from "../middleware/authUser";

export const userRouter = Router();
const userController = new User();

userRouter.post("/user", userController.createUser);

userRouter.post('/login', userController.logUser, authUser);

//userRouter.get("/user", userController.getUser);
