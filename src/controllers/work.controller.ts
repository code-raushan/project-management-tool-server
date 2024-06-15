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