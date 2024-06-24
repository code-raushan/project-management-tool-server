import { Router } from "express";
import { addActivities, createWork, deleteWork, getWorkDetails, listCurrentDayActivity, listWorks, updateWorkActivities } from "../controllers/work.controller";
import { verifyToken } from "../middlewares/auth.middleware";
import { asyncHandler } from "../utils/asynchandler";

const workRouter = Router();

workRouter.post("/", verifyToken, asyncHandler(createWork));
workRouter.get("/", verifyToken, asyncHandler(listWorks));
workRouter.post("/add/activities/:workId", verifyToken, asyncHandler(addActivities));
workRouter.get("/activities", asyncHandler(listCurrentDayActivity));
workRouter.patch("/activities/:id", asyncHandler(updateWorkActivities));
workRouter.delete("/:id", verifyToken, asyncHandler(deleteWork));
workRouter.get("/:id", asyncHandler(getWorkDetails));

export default workRouter;