import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";
import { UserRole } from "../types/role.type";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const firstName = req.body.firstName as string;
  const lastName = req.body.lastName as string;
  const email = req.body.email as string;
  const password = req.body.password as string;
  const role = req.body.role as UserRole;
  const address = req.body.address as string | undefined;
  const phoneNumber = req.body.phoneNumber as string | undefined;
  const isdCode = req.body.isdCode as string | undefined;
  // const userRole = req.user.role as UserRole;

  const response = await userService.createUser({ firstName, lastName, email, password, role, address, phoneNumber, isdCode });

  next(response);
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email as string;
  const password = req.body.password as string;

  const response = await userService.loginUser({ email, password });

  next(response);
};