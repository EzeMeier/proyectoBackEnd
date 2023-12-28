import { usersModel } from "./models/users.model.js";
import { logger } from "../../helpers/logger.js";

export class UsersManagerMongo {
  constructor() {
    this.model = usersModel;
  }

  //add user
  async addUser(userInfo) {
    try {
      const result = await this.model.create(userInfo);
      return result;
    } catch (error) {
      logger.error(`add user error: ${error.message}`);
      throw new Error(`add user error: ${error.message}`);
    }
  }

  //get user by ID
  async getUserById(id) {
    try {
      const result = await this.model.findById(id);
      return result;
    } catch (error) {
      logger.error(`get user by ID error: ${error.message}`);
      throw new Error(`get user by ID error: ${error.message}`);
    }
  }

  //get user by email
  async getUserByEmail(email) {
    try {
      const result = await this.model.findOne({ email: email }).lean();
      return result;
    } catch (error) {
      logger.error(`get user by email error: ${error.message}`);
      throw new Error(`get user by email error: ${error.message}`);
    }
  }

  //update user
  async updateUser(id, user) {
    try {
      const result = await this.model.findByIdAndUpdate(id, user, {
        new: true,
      });
      return result;
    } catch (error) {
      logger.error(`update user error: ${error.message}`);
      throw new Error(`update user error: ${error.message}`);
    }
  }
}
