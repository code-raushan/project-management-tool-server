import { NextFunction, Request, Response } from "express";
import { IUpdateActivitiesParams } from "../repositories/work.repository";
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

export const deleteWork = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id as string;
  const createdBy = req.user.id as string;

  const response = await workService.deleteWork({ id, createdBy });

  next(response);
};

export const listCurrentDayActivity = async (req: Request, res: Response, next: NextFunction) => {
  const date = req.query.date as string;

  const response = await workService.getActivities(date);

  next(response);
};

export const updateWorkActivities = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id as string;
  const activities = req.body.activities as IUpdateActivitiesParams[];

  const response = await workService.updateWorkActivities({ id, activities });

  next(response);
};
