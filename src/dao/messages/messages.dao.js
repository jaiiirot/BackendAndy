import { Messages } from "./messages.schema.js";

class MessagesDAO {
  async getAll() {
    try {
      return await Messages.find();
    } catch (error) {
      console.error("Error al obtener todos los mensajes:", error);
      throw error;
    }
  }

  async addMessage(data) {
    try {
      return await Messages.create(data);
    } catch (error) {
      console.error("Error al agregar un mensaje:", error);
      throw error;
    }
  }
}

export default new MessagesDAO();
