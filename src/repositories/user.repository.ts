import UserModel from "../models/user.model";
import { AuthType } from "../types/auth.type";
import { UserRole } from "../types/role.type";

export interface ICreateUserParams {
  firstName: string
  lastName: string
  email: string
  password: string
  address?: string
  isdCode?: string
  phoneNumber?: string
  authProvider: AuthType
  role: UserRole
}

export interface ILoginUserParams {
  email: string
  password: string
}

export class UserRepository {
  private _userModel = UserModel;

  async createUser(params: ICreateUserParams) {
    const { firstName, lastName, email, authProvider, role, password, ...rest } = params;

    return this._userModel.create({
      firstName,
      lastName,
      email,
      authProvider,
      role,
      password,
      ...rest
    });
  }

  async getUserDetails(email: string) {
    return this._userModel.findOne({ email });
  }
}