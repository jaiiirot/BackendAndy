import { Carts } from "./schemas/carts.schema.js";

class CartsDAO {
  static async getAll() {
    return Carts.find({}).lean();
  }
}

export default CartsDAO;
