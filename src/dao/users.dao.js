import { Users } from "./schemas/users.schema.js";

class UsersDAO {
  async getAll() {
    return Users.find();
  }
  async getByUsername(username) {
    return Users.findOne({ username: username });
  }
  async getByEmail(email) {
    return Users.findOne({ email });
  }
  async getByEmailAndPassword(data) {
    return Users.findOne({ email: data.email, password: data.password });
  }
  async postUser(data) {
    console.log(data);
    return Users.create(data);
  }
}

export default new UsersDAO();
