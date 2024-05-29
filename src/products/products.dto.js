// import ProductsDAO from "./products.dao.js";
// import CartsDAO from "../carts/carts.dao.js";

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
			description: description || "",
			code: code || "",
			price: price || "",
			status: status || true,
			promocion: promocion || false,
			stock: stock || "",
			type: type || "",
			genre: genre || "",
			category: category || [],
			photo: photo || [],
		};
	}

	async postProduct(data) {
		const { title, description, code, price, stock, category, photo } = data;
		const newProduct = await this.createProductData(
			title,
			description,
			code,
			price,
			null,
			null,
			stock,
			null,
			null,
			category,
			photo
		);
		console.log("DTO: ", newProduct);
		// return newProduct;
	}
}

export default new ProductsDTO();
