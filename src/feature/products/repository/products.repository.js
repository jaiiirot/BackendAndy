import ProductDTO from "../products.dto.js";
import { resizeImageBuffer } from "../../../utils/sharp.js";
import {
	postCloudinaryBuffer,
	deleteCloudinary,
} from "../../../utils/cloudinary.js";

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
		if (!data.photoUrl) {
			for (const photo of photoFiles) {
				const buffer = await resizeImageBuffer(photo.buffer, 300, 300);
				const result = await postCloudinaryBuffer(buffer);
				photos.push(result.secure_url);
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
			const photoUrls = await this.dao.getById(id);

			if (data.photoUrl || photoFiles.length > 0) {
				if (!data.photoUrl) {
					for (const photo of photoFiles) {
						const buffer = await resizeImageBuffer(photo.buffer, 300, 300);
						const result = await postCloudinaryBuffer(buffer);
						photos.push(result.secure_url);
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
								await deleteCloudinary(element);
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
			await deleteCloudinary(element);
		});
		return await this.dao.deleteProduct(id);
	};
}
