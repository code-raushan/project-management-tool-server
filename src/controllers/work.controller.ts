import { NextFunction, Request, Response } from "express";
import workService from "../services/work.service";

export const createWork = async (req: Request, res: Response, next: NextFunction) => {
  const title = req.body.title as string;
  const startDate = req.body.startDate as string;
  const endDate = req.body.endDate as string;
  const createdBy = req.user.id as string;

  const response = await workService.create({
    title, startDate, endDate, createdBy
  });

  next(response);
};

export const listWorks = async (req: Request, res: Response, next: NextFunction) => {
  const createdBy = req.user.id as string;

  const response = await workService.listWorks(createdBy);

  next(response);
};

export const getWorkDetails = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id as string;

  const response = await workService.getWorkDetails(id);

  next(response);
};

export const addActivities = async (req: Request, res: Response, next: NextFunction) => {
  const workId = req.params.workId as string;
  const activities = req.body.activities as { activityRef: string, activityDescription: string, assignedDates: string[] }[];
  const createdBy = req.user.id as string;

  const response = await workService.addActivities({ workId, activities, createdBy });

  next(response);
};