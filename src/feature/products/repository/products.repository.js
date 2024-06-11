import ProductDTO from "../products.dto.js";
import { servicesExternal } from "../../../services/repository/external.service.js";

export default class ProductRepository {
	constructor(dao) {
		this.dao = dao;
	}

	getAll = async (query, options) => {
		const products = await this.dao.getAll(query, options);
		return products;
	};

	getById = async id => {
		const product = await this.dao.getById(id);
		product.description = product.description.replace(/<br>/g, "\n");
		return product;
	};

	get = async id => {
		const product = await this.dao.getById(id);
		product.description = product.description.replace(/<br>/g, "\n");
		return product;
	};

	post = async (data, photoFiles) => {
		let photos = [];
		data.status = data.status === "on";
		data.promocion = data.promocion === "on";
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
		data.photo = photos;
		const newProduct = new ProductDTO(data);
		const result = await this.dao.addProduct(newProduct);
		return result;
	};

	put = async (id, data, photoFiles) => {
		try {
			let photos = [];
			let condition = false;
			data.status = data.status === "on";
			data.promocion = data.promocion === "on";
			const photoUrls = await this.dao.getById(id);
			if (data.photoUrl || photoFiles.length > 0) {
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
					await Promise.all(
						photoUrls.photo.map(async element => {
							if (element.includes("res.cloudinary.com")) {
								await servicesExternal.deleteCloudinary(element);
							}
						})
					);
				}
			} else {
				photos = photoUrls.photo;
			}
			data.photo = photos;
			const result = new ProductDTO(data);
			return await this.dao.updateProduct(id, result);
		} catch (error) {
			console.error("Error in put method:", error);
			throw error;
		}
	};

	delete = async id => {
		const photoUrls = await this.dao.getById(id);
		photoUrls.photo.forEach(async element => {
			await servicesExternal.deleteCloudinary(element);
			// await deleteCloudinary(element);
		});
		return await this.dao.deleteProduct(id);
	};
}
