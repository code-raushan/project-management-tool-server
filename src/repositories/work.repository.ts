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

export interface IUpdateActivitiesParams {
  activityRef: string;
  activityDescription: string,
  assignedDates: string[],
  activityId: string,
  activityStatus: {
    date?: string,
    status?: string,
    comment?: string,
  }[],
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

  async deleteWork(id: string) {
    return this._WorkModel.findOneAndDelete({ _id: new Types.ObjectId(id) });
  }

  async getActivities(date: string) {
    return this._WorkModel.aggregate([
      {
        $unwind: "$activities"
      },
      {
        $match: {
          "activities.assignedDates": date
        }
      },
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          startDate: { $first: "$startDate" },
          endDate: { $first: "$endDate" },
          createdBy: { $first: "$createdBy" },
          activities: {
            $push: {
              activityId: "$activities._id",
              activityRef: "$activities.activityRef",
              activityDescription: "$activities.activityDescription",
              activityStatus: "$activities.activityStatus",
              assignedDates: "$activities.assignedDates"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          workId: "$_id",
          title: 1,
          startDate: 1,
          endDate: 1,
          date: date,
          createdBy: 1,
          activities: 1
        }
      }
    ]
    );
  }

  async updateActivities(params: { id: string, activities: IUpdateActivitiesParams[] }) {
    const { id, activities } = params;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const toUpdateActivities = activities.map(({ activityId, ...rest }) => rest);

    console.log({ id, activities });

    return this._WorkModel.findByIdAndUpdate(id, {
      activities: toUpdateActivities
    }, { new: true, upsert: true });
  }
}