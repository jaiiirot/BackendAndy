import Products from "./products.schema.js";
import { logger } from "../../utils/logger/logger.js";

export default class ProductsDAO {
	async insertMany(products) {
		try {
			return await Products.insertMany(products);
		} catch (error) {
			logger.error("🔴 Error al insertar varios productos:", error);
			throw error;
		}
	}

	async getAll(query, options) {
		try {
			// console.log(query, options);
			return await Products.paginate(query, { ...options, lean: true });
		} catch (error) {
			logger.error("🔴 Error al obtener todos los productos:", error);
			throw error;
		}
	}

	async getAllWithLimit(query, limit) {
		try {
			limit = limit || 25;
			return await Products.paginate(query, { limit, lean: true });
		} catch (error) {
			logger.error(`🔴 Error al obtener productos con límite ${limit}:`, error);
			throw error;
		}
	}

	async getByCategorys(categorys) {
		try {
			return await Products.paginate(
				{ category: { $in: categorys } },
				{ limit: 25, lean: true }
			);
		} catch (error) {
			logger.error(
				`🔴 Error al obtener productos por categoría ${categorys}:`,
				error
			);
			throw error;
		}
	}

	async getByPromocion(promocion) {
		try {
			return await Products.paginate({ promocion }, { limit: 25, lean: true });
		} catch (error) {
			logger.error(
				`🔴 Error al obtener productos por promocion ${promocion}:`,
				error
			);
			throw error;
		}
	}

	async getStockByProduct(id) {
		try {
			return await Products.findById(id, { stock: 1 }).lean();
		} catch (error) {
			logger.error(
				`🔴 Error al obtener stock de producto con ID ${id}:`,
				error
			);
			throw error;
		}
	}

	async getById(id) {
		try {
			return await Products.findOne({ _id: id }).lean();
		} catch (error) {
			logger.error(`🔴 Error al obtener producto con ID ${id}:`, error);
			throw error;
		}
	}

	async putStockByProduct(accion, id, quantity) {
		try {
			let putStock = {};
			switch (accion) {
				case "more":
					putStock = { $inc: { stock: quantity } };
					break;
				case "less":
					putStock = { $inc: { stock: -quantity } };
					break;
				default:
					break;
			}
			const updatedProduct = await Products.findByIdAndUpdate(id, putStock, {
				new: true,
			});
			if (!updatedProduct) {
				throw new Error(`Producto con ID ${id} no encontrado`);
			}
			return updatedProduct;
		} catch (error) {
			logger.error(
				`🔴 Error al actualizar stock de producto con ID ${id}:`,
				error
			);
			throw error;
		}
	}

	async addProduct(product) {
		try {
			return await Products.create(product);
		} catch (error) {
			logger.error("🔴 Error al agregar un producto:", error);
			throw error;
		}
	}

	async deleteProduct(id) {
		try {
			return await Products.findByIdAndDelete(id);
		} catch (error) {
			logger.error(`🔴 Error al eliminar producto con ID ${id}:`, error);
			throw error;
		}
	}

	async updateProduct(id, product) {
		try {
			return await Products.findByIdAndUpdate(id, product, {
				new: true,
			}).lean();
		} catch (error) {
			logger.error(`🔴 Error al actualizar producto con ID ${id}:`, error);
			throw error;
		}
	}
}
