import ProductsDAO from "./products.dao.js";
// import CartsDAO from "../carts/carts.dao.js";
import { postImages } from "../service/cloudImage.js";
class ProductsDTO {
	async createProductData(
		title,
		description,
		code,
		price,
		status,
		promocion,
		stock,
		type,
		genre,
		category,
		photo
	) {
		return {
			title: title || "",
			description: description.replace(/\n/g, "<br>") || "",
			code: code || "",
			price: price || "",
			status: status || true,
			promocion: promocion || false,
			stock: stock || "",
			type: type || "",
			genre: genre || "",
			category: category.split(",") || [],
			photo: photo.map(e => e) || [],
		};
	}

	async postProduct(data, photoFiles) {
		const { title, description, code, price, stock, category, photoUrl } = data;
		const photos = !photoUrl
			? await Promise.all(photoFiles.map(file => postImages(file, 300, 300)))
			: photoUrl;
		const newProduct = await this.createProductData(
			title,
			description,
			code,
			price,
			null,
			null,
			stock,
			"accesorio",
			"masculino",
			category,
			photos
		);
		return newProduct;
	}

	async getProduct(id) {
		const product = await ProductsDAO.getById(id);
		const { title, description, code, price, stock, category, photo } = product;
		return {title, description: description.replace(/<br>/g,"\n"), code, price, stock, category, photo};
	}
}

export default new ProductsDTO();
