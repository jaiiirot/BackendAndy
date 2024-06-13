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
		this.owner = product.owner || "0a0a0a0a0a0a0a000a0a0a";
	}
}
