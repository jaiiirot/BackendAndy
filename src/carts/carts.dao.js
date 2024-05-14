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
			const existcart = await this.getById(cartId);
			// console.log(cartId, productId, existcart);
			const existprod = existcart.products.find(prod =>
				prod.pid.equals(productId)
			);

			if (existprod) {
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

	static async updateCart(cartId, cart) {
		try {
			return await Carts.findByIdAndUpdate(cartId, cart, { new: true });
		} catch (error) {
			console.error("Error al actualizar carrito:", error);
		}
	}

	static async CartUpdateProduct(cartId, productId, product) {
		try {
			await Carts.updateOne(
				{ _id: cartId, "products.pid": productId },
				{ $set: { "products.$.quantity": product.quantity } }
			);
		} catch (error) {
			console.error("Error al actualizar producto del carrito:", error);
		}
	}

	static async deleteCart(cartId) {
		try {
			return await Carts.updateOne({ _id: cartId }, { $set: { products: [] } });
		} catch (error) {
			console.error("Error al eliminar carrito:", error);
		}
	}

	static async CartDeleteProduct(cartId, productId) {
		try {
			await Carts.updateOne(
				{ _id: cartId },
				{ $pull: { products: { pid: productId } } }
			);
		} catch (error) {
			console.error("Error al eliminar producto del carrito:", error);
		}
	}
}

export default CartsDAO;
