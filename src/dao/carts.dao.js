import { Carts } from "./schemas/carts.schema.js";

class CartsDAO {
  static async getAll() {
    try {
      return await Carts.find({}).lean();
    } catch (error) {
      console.error("Error al obtener todos los carritos:", error);
    }
  }
}

export default CartsDAO;
