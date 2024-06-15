import { Router } from "express";
import { createWork } from "../controllers/work.controller";
import { asyncHandler } from "../utils/asynchandler";

const workRouter = Router();

workRouter.post("/", asyncHandler(createWork));

export default workRouter;