import mongoose from "mongoose";
import { AuthType } from "../types/auth.type";
import { UserRole } from "../types/role.type";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  address: {
    type: String,
  },
  isdCode: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  imgURL: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  authProvider: {
    type: String,
    enum: AuthType,
    default: AuthType.EMAIL
  },
  role: {
    type: String,
    enum: UserRole,
    default: UserRole.CONTRACTOR,
  }
});

interface IUserModel extends mongoose.Schema {
  _id: string
  firstName: string
  lastName: string
  email: string
  password?: string
  address: string
  isdCode: string
  phoneNumber: string
  verified: boolean
  authProvider: AuthType
  role: UserRole
}

const UserModel = mongoose.model<IUserModel>("user", userSchema);

export default UserModel;