import { Router } from "express";
import { createUser, loginUser } from "../controllers/user.controller";
import { asyncHandler } from "../utils/asynchandler";

const userRouter = Router();

userRouter.post("/create", asyncHandler(createUser));
userRouter.post("/login", asyncHandler(loginUser));

export default userRouter;