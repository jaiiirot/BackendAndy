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
}

export default new ProductsDTO();
