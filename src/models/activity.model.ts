import { Document, model, Schema } from "mongoose";

export enum ActivityStatus {
  FINISHED = "finished",
  DELAYED = "delayed",
}

export const ActivitySchema = new Schema({
  activityRef: {
    type: String,
    required: true
  },
  activityDescription: {
    type: String,
    required: true,
  },
  assignedDates: {
    type: [String],
    default: []
  },
  activityStatus: {
    type: String,
    enum: ActivityStatus,
  },
  comments: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

export interface IActivity extends Document {
  activityRef: string;
  activityDescription: string,
  assignedDates: string[],
  activityStatus?: string,
  comments?: string[]
}

const ActivityModel = model<IActivity>("activity", ActivitySchema);

export default ActivityModel;