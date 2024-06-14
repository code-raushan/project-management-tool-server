import { Router } from "express";
import { health, helloWorld } from "../controllers/health.controller";
import { asyncHandler } from "../utils/asynchandler";
import userRouter from "./user.route";

const v1Router = Router();

v1Router.get("/", asyncHandler(helloWorld));
v1Router.get("/health", asyncHandler(health));
v1Router.use("/user", userRouter);

export default v1Router;