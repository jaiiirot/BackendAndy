export default class ProductsDTO {
	constructor(product) {
		this.title = product.title || " ";
		this.description = product.description || " ";
		this.code = product.code || " ";
		this.price = product.price || " ";
		this.status = product.status || true;
		this.promocion = product.promocion || false;
		this.stock = product.stock || " ";
		this.type = product.type || " ";
		this.genre = product.genre || " ";
		this.category = product.category || [];
		this.photo = product.photo || [];
		this.owner = product.owner || "666f9a6b69ba88b383d88942";
	}
}
