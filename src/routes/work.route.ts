import { Router } from "express";
import { createWork } from "../controllers/work.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import { asyncHandler } from "../utils/asynchandler";

const workRouter = Router();

workRouter.post("/", verifyToken, asyncHandler(createWork));

export default workRouter;