import bcrypt from "bcryptjs";
import { BadRequestError } from "../errors/bad-request.error";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { ICreateUserParams, UserRepository } from "../repositories/user.repository";
import { AuthType } from "../types/auth.type";
import { signJWT } from "./jwt";

class UserService {
  constructor(private readonly _userRepository: UserRepository) {

  }

  // params: Omit<ICreateUserParams, "authProvider"> & { userRole: UserRole }
  async createUser(params: Omit<ICreateUserParams, "authProvider">) {
    const { firstName, lastName, email, password, role, address, isdCode, phoneNumber } = params;

    const checkIfUserExists = await this._userRepository.getUserDetails(email);
    if (checkIfUserExists) throw new BadRequestError("User already exists with this email");

    // if (userRole !== UserRole.SUPERVISOR) throw new UnauthorizedError("Not authorized to create a user");

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await this._userRepository.createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      authProvider: AuthType.EMAIL,
      role,
      address,
      isdCode,
      phoneNumber
    });
    if (!createdUser) throw new BadRequestError("failed to create user");

    createdUser.password = undefined;

    return createdUser;
  }

  async loginUser(params: { email: string, password: string }) {
    const { email, password } = params;

    const userDetails = await this._userRepository.getUserDetails(email);
    if (!userDetails) throw new BadRequestError("User not signed up.");

    if (userDetails.authProvider !== AuthType.EMAIL || !userDetails.password) throw new UnauthorizedError("Invalid email or password");

    const matchedPassword = await bcrypt.compare(password, userDetails.password);
    if (!matchedPassword) throw new UnauthorizedError("invalid email or password");

    const token = signJWT({ id: userDetails.id, role: userDetails.role }, "1d");

    return {
      accessToken: token,
      user: {
        id: userDetails.id,
        email: userDetails.email,
        role: userDetails.role
      }
    };
  }
}

export default new UserService(new UserRepository());