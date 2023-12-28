import { chatModel } from "./models/chat.model.js";
import { logger } from "../../helpers/logger.js";

export class ChatManagerMongo {
  constructor() {
    this.model = chatModel;
  }

  //get messagges
  async getMessages() {
    try {
      const result = await this.model.find();
      return result;
    } catch (error) {
      logger.error(`get messagges error: ${error.message}`);
      throw new Error(`get messagges error: ${error.message}`);
    }
  }

  //add messagge
  async addMessage(data) {
    try {
      const result = await this.model.create(data);
      return result;
    } catch (error) {
      logger.error(`add messagge error: ${error.message}`);
      throw new Error(`add messagge error: ${error.message}`);
    }
  }
}
