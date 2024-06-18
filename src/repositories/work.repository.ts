import { Types } from "mongoose";
import WorkModel from "../models/work.model";

export interface ICreateWorkParams {
  title: string,
  startDate: string,
  endDate: string,
  createdBy: string,
}

export interface IAddActivitiesParams {
  workId: string,
  activities: {
    activityRef: string,
    activityDescription: string,
    assignedDates: string[]
  }[]
}

export class WorkRepository {
  private _WorkModel = WorkModel;

  async create(params: ICreateWorkParams) {
    const { title, startDate, endDate, createdBy } = params;

    return this._WorkModel.create({
      title,
      startDate,
      endDate,
      createdBy
    });
  }

  async listWorks(createdBy: string) {
    return this._WorkModel.find({ createdBy }).sort({ createdAt: "desc" });
  }

  async getWorkDetails(id: string) {
    return this._WorkModel.findOne({ _id: new Types.ObjectId(id) });
  }

  async addActivities(params: IAddActivitiesParams) {
    const { workId, activities } = params;
    return this._WorkModel.findByIdAndUpdate(workId, {
      activities: activities
    });

  }
}