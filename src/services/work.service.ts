import { BadRequestError } from "../errors/bad-request.error";
import { NotFoundError } from "../errors/not-found.error";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { ICreateWorkParams, IUpdateActivitiesParams, WorkRepository } from "../repositories/work.repository";

export interface IAddActivitiesServiceParams {
  createdBy: string,
  workId: string,
  activities: {
    activityRef: string,
    activityDescription: string,
    assignedDates: string[]
  }[]
}

class WorkService {
  constructor(private readonly _workRepository: WorkRepository) {

  }

  async create(params: ICreateWorkParams) {
    const { title, startDate, endDate, createdBy } = params;

    const createdWork = await this._workRepository.create({ title, startDate, endDate, createdBy });

    if (!createdWork) throw new BadRequestError("Failed to create the work record");

    return createdWork;
  }

  async listWorks(createdBy: string) {
    const works = await this._workRepository.listWorks(createdBy);
    if (!works) throw new BadRequestError("failed to get the works created by the user");

    return works;
  }

  async getWorkDetails(id: string) {
    const workDetails = await this._workRepository.getWorkDetails(id);

    if (!workDetails) throw new NotFoundError("Work details not found");

    return workDetails;
  }

  async addActivities(params: IAddActivitiesServiceParams) {
    const { workId, createdBy, activities } = params;

    const workDetails = await this.getWorkDetails(workId);
    if (!workDetails) throw new BadRequestError("failed to get the work details");

    if (String(workDetails.createdBy) !== createdBy) throw new UnauthorizedError("Not authorized to add activities");

    const updatedWorkWithActivities = await this._workRepository.addActivities({ workId, activities });
    if (!updatedWorkWithActivities) throw new BadRequestError("failed to add activities");

    return updatedWorkWithActivities;
  }

  async deleteWork(params: { createdBy: string, id: string }) {
    const { createdBy, id } = params;

    const workDetails = await this._workRepository.getWorkDetails(id);
    if (!workDetails) throw new BadRequestError("failed to get the work details");

    if (String(workDetails.createdBy) !== createdBy) throw new UnauthorizedError("Not authorized to delete the work deletes");

    const deletedWork = await this._workRepository.deleteWork(id);
    if (!deletedWork) throw new BadRequestError("failed to delete the work details");

    return deletedWork;
  }

  async getActivities(date: string) {
    const activities = await this._workRepository.getActivities(date);
    if (!activities) throw new BadRequestError("failed to get the activities");

    return activities;
  }

  async updateWorkActivities(params: { id: string, activities: IUpdateActivitiesParams[] }) {
    const { id, activities } = params;

    console.log({ id, activities });

    const updatedWorkWithActivities = await this._workRepository.updateActivities({ id, activities });
    if (!updatedWorkWithActivities) throw new BadRequestError("failed to update the activites for the work");

    return updatedWorkWithActivities;
  }
}

export default new WorkService(new WorkRepository());