import Products from "../schemas/products.schema.js";

class ProductsDAO {
	static async getAll(query, options) {
		try {
			return await Products.paginate(query, { ...options, lean: true });
		} catch (error) {
			console.error("Error al obtener todos los productos:", error);
			throw error;
		}
	}

	static async getAllWithLimit(query, limit) {
		try {
			limit = limit || 25;
			return await Products.paginate(query, { limit, lean: true });
		} catch (error) {
			console.error(`Error al obtener productos con límite ${limit}:`, error);
			throw error;
		}
	}

	static async getByCategorys(categorys) {
		try {
			return await Products.paginate(
				{ category: { $in: categorys } },
				{ limit: 25, lean: true }
			);
		} catch (error) {
			console.error(
				`Error al obtener productos por categoría ${categorys}:`,
				error
			);
			throw error;
		}
	}

	static async getByPromocion(promocion) {
		try {
			return await Products.paginate({ promocion }, { limit: 25, lean: true });
		} catch (error) {
			console.error(
				`Error al obtener productos por promocion ${promocion}:`,
				error
			);
			throw error;
		}
	}

	static async getById(id) {
		try {
			return await Products.findOne({ _id: id }).lean();
		} catch (error) {
			console.error(`Error al obtener producto con ID ${id}:`, error);
			throw error;
		}
	}

	static async addProduct(product) {
		try {
			return await Products.create(product);
		} catch (error) {
			console.error("Error al agregar un producto:", error);
			throw error;
		}
	}

	static async deleteProduct(id) {
		try {
			return await Products.findByIdAndDelete(id);
		} catch (error) {
			console.error(`Error al eliminar producto con ID ${id}:`, error);
			throw error;
		}
	}

	static async deleteProducts(ids) {
		try {
			return await Products.deleteMany({ _id: { $in: ids } });
		} catch (error) {
			console.error("Error al eliminar varios productos:", error);
			throw error;
		}
	}

	static async updateProduct(id, product) {
		try {
			return await Products.findByIdAndUpdate(id, product, {
				new: true,
			}).lean();
		} catch (error) {
			console.error(`Error al actualizar producto con ID ${id}:`, error);
			throw error;
		}
	}
}

export default ProductsDAO;
