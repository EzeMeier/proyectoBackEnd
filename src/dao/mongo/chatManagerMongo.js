import { chatModel } from "./models/chat.model.js";

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
      console.log(`Error al obtener el mensaje: ${error.message}`);
      throw new Error(`Error al obtener el mensaje: ${error.message}`);
    }
  }

  //add messagge
  async addMessage(data) {
    try {
      const result = await this.model.create(data);
      return result;
    } catch (error) {
      console.log(`Error al agregar el mensaje: ${error.message}`);
      throw new Error(`Error al agregar el mensaje: ${error.message}`);
    }
  }
}
