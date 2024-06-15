import WorkModel from "../models/work.model";

export interface ICreateWorkParams {
  title: string,
  startDate: string,
  endDate: string,
  createdBy: string,
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
}