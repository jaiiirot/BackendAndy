import ProductDTO from "../products.dto.js";
import { servicesExternal } from "../../../services/repository/external.service.js";
import { logger } from "../../../utils/logger/logger.js";

export default class ProductRepository {
	constructor(dao, userDao, cartDao) {
		this.dao = dao;
		this.userDao = userDao;
		this.cartDao = cartDao;
	}

	getAll = async (query, options) => {
		try {
			logger.info(
				"R: 🔍 Buscando todos los productos con los parámetros proporcionados"
			);
			const products = await this.dao.getAll(query, options);
			logger.info("R: 🛍️ Todos los productos obtenidos correctamente");
			return products;
		} catch (error) {
			logger.error("R: 🔴 Error al obtener todos los productos:", error);
			throw error;
		}
	};

	getById = async id => {
		try {
			logger.info(`R: 🔍 Buscando producto con ID ${id}`);
			const product = await this.dao.getById(id);
			product.description = product.description.replace(/<br>/g, "\n");
			logger.info(`R: 📦 Producto con ID ${id} obtenido correctamente`);
			return product;
		} catch (error) {
			logger.error(`R: 🔴 Error al obtener producto por ID ${id}:`, error);
			throw error;
		}
	};

	get = async id => {
		try {
			logger.info(`R: 🔍 Buscando producto con ID ${id}`);
			const product = await this.dao.getById(id);
			product.description = product.description.replace(/<br>/g, "\n");
			logger.info(`R: 📦 Producto con ID ${id} obtenido correctamente`);
			return product;
		} catch (error) {
			logger.error(`R: 🔴 Error al obtener producto por ID ${id}:`, error);
			throw error;
		}
	};

	post = async (data, photoFiles) => {
		try {
			logger.info("R: ➕ Añadiendo un nuevo producto");
			data.status = data.status === "on";
			data.promocion = data.promocion === "on";

			if (!data.photoUrl) {
				data.photo = await Promise.all(
					photoFiles.map(async photo => {
						return await servicesExternal.postResizeCloudBuffer(
							photo.buffer,
							300,
							300
						);
					})
				);
			} else {
				data.photo = data.photoUrl;
			}

			const newProduct = new ProductDTO(data);
			const result = await this.dao.addProduct(newProduct);
			logger.info("R: 🆕 Nuevo producto agregado correctamente");
			return result;
		} catch (error) {
			logger.error("R: 🔴 Error al agregar un nuevo producto:", error);
			throw error;
		}
	};

	put = async (id, data, photoFiles) => {
		try {
			logger.info(`R: 🔄 Actualizando producto con ID ${id}`);
			let photos = [];
			let condition = false;
			data.status = data.status === "on";
			data.promocion = data.promocion === "on";
			const photoUrls = await this.dao.getById(id);
			const conditionPhotoFiles =
				Array.isArray(photoFiles) && photoFiles.length > 0;
			if (data.photoUrl || conditionPhotoFiles) {
				if (!data.photoUrl) {
					for (const photo of photoFiles) {
						const result = await servicesExternal.postResizeCloudBuffer(
							photo.buffer,
							300,
							300
						);
						photos.push(result);
					}
				} else {
					photos = data.photoUrl;
				}

				photoUrls.photo.forEach(e => {
					if (e.includes("res.cloudinary.com")) {
						condition = true;
					}
				});
				if (condition) {
					photoUrls.photo.map(async element => {
						if (element.includes("res.cloudinary.com")) {
							await servicesExternal.deleteCloudinary(element);
						}
					});
				}
			} else {
				photos = photoUrls.photo;
			}
			data.photo = photos;
			const result = new ProductDTO(data);
			const updatedProduct = await this.dao.updateProduct(id, result);
			logger.info(`R: 🔄 Producto con ID ${id} actualizado correctamente`);
			return updatedProduct;
		} catch (error) {
			logger.error(
				`R: 🔴 Error al actualizar el producto con ID ${id}:`,
				error
			);
			throw error;
		}
	};

	delete = async id => {
		try {
			logger.info(`R: 🗑️ Eliminando producto con ID ${id}`);
			const photoUrls = await this.dao.getById(id);

			// const dataUser = await this.userDao.getPopulateCart();
			// const cartsPremium = dataUser.map(user => user.cart.cid);

			await Promise.all(
				photoUrls.photo.map(async element => {
					await servicesExternal.deleteCloudinaryAndFs(element);
				})
			);

			const result = await this.dao.deleteProduct(id);
			logger.info(`R: 🗑️ Producto con ID ${id} eliminado correctamente`);
			return result;
		} catch (error) {
			logger.error(`R: 🔴 Error al eliminar el producto con ID ${id}:`, error);
			throw error;
		}
	};

	insertMany = async data => {
		try {
			logger.info("R: ➕ Añadiendo varios productos");
			const result = await this.dao.insertMany(data);
			logger.info("R: 🆕 Varios productos agregados correctamente");
			return result;
		} catch (error) {
			logger.error("R: 🔴 Error al agregar varios productos:", error);
			throw error;
		}
	};
}
