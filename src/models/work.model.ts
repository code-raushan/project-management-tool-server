import { Document, model, Schema } from "mongoose";
import { ActivitySchema } from "./activity.model";

export const WorkSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  activities: {
    type: [ActivitySchema],
    default: []
  }
}, {
  timestamps: true
});


export interface IWork extends Document {
  title: string
  startDate: string
  endDate: string,
  activities: {
    activityRef: string,
    activityDescription: string,
    assignedDates: string[]
  }[]
}

const WorkModel = model<IWork>("work", WorkSchema);

export default WorkModel;