import { Console } from "console";
import { Carts } from "./carts.schema.js";

class CartsDAO {
  static async getAll() {
    try {
      return await Carts.find({}).lean();
    } catch (error) {
      console.error("Error al obtener todos los carritos:", error);
    }
  }

  static async getById(id) {
    try {
      return await Carts.findById(id).lean();
    } catch (error) {
      console.error("Error al obtener carrito por id:", error);
    }
  }

  static async getByIdPopulate(id) {
    try {
      return await Carts.findById(id).populate("products.pid").lean();
    } catch (error) {
      console.error("Error al obtener carrito por id:", error);
    }
  }
  static async addCart(cart) {
    try {
      return await Carts.create(cart);
    } catch (error) {
      console.error("Error al agregar carrito:", error);
    }
  }

  static async CartAddProduct(cartId, productId) {
    try {
      const exist_cart = await this.getById(cartId);
      const exist_prod = exist_cart.products.find((prod) =>
        prod.pid.equals(productId)
      );

      if (exist_prod) {
        await Carts.updateOne(
          { _id: cartId, "products.pid": productId },
          { $inc: { "products.$[elem].quantity": 1 } },
          { arrayFilters: [{ "elem.pid": productId }] }
        );
      } else {
        await Carts.updateOne(
          { _id: cartId },
          { $push: { products: { pid: productId, quantity: 1 } } }
        );
      }
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
    }
  }
}

export default CartsDAO;
