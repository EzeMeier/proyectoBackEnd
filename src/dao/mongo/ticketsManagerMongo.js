import { ticketsModel } from "./models/tickets.model.js";
import { logger } from "../../helpers/logger.js";


export class TikcketsManagerMongo {
  constructor() {
    this.model = ticketsModel;
  }

  async getAll() {
    try {
      const result = await this.model.find();
      return result;
    } catch (error) {
      logger.error(`Error al obtener el ticket ${error.message}`);
      throw new Error(`Error al obtener el ticket ${error.message}`);
    }
  }

  async addTicket(ticket) {
    try {
      const result = await this.model.create(ticket);
      return result;
    } catch (error) {
      logger.error(`Error al agregar el ticket: ${error.message}`);
      throw new Error(`Error al agregar el ticket: ${error.message}`);
    }
  }

  async getTicketById(id) {
    try {
      const result = await this.model.findById(id);
      return result;
    } catch (error) {
      logger.error(`Error al obtener el ticket por ID: ${error.message}`);
      throw new Error(`Error al obtener el ticket por ID: ${error.message}`);
    }
  }
}
