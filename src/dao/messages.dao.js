import { Messages } from "./schemas/messages.schema.js";
import usersDao from "./users.dao.js";
class MessagesDAO {
  async getAll() {
    return await Messages.find();
  }
  async addMessage(data) {
    return await Messages.create(data);
  }
}

export default new MessagesDAO();
