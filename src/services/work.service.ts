import { BadRequestError } from "../errors/bad-request.error";
import { ICreateWorkParams, WorkRepository } from "../repositories/work.repository";

class WorkService {
  constructor(private readonly _workRepository: WorkRepository) {

  }

  async create(params: ICreateWorkParams) {
    const { title, startDate, endDate, createdBy } = params;

    const createdWork = await this._workRepository.create({ title, startDate, endDate, createdBy });

    if (!createdWork) throw new BadRequestError("Failed to create the work record");

    return createdWork;
  }
}

export default new WorkService(new WorkRepository());