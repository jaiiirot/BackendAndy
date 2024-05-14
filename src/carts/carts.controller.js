import CartsDAO from "./carts.dao.js";

const getAllCarts = async (req, res) => {
	const carts = await CartsDAO.getAll();
	res.status(200).send(carts);
};

const getCartById = async (req, res) => {
	const cart = await CartsDAO.getByIdPopulate(req.params.cid);
	if (!cart) {
		res.status(404).send({ error: "Carrito no encontrado" });
		return;
	}
	res.status(200).send(cart);
};

const postCreateCart = async (req, res) => {
	const newCart = await CartsDAO.addCart(req.body);
	res.status(201).send(newCart);
};

const postAddProductToCart = async (req, res) => {
	const { cid, pid } = req.params;
	if (cid && pid) {
		await CartsDAO.CartAddProduct(cid, pid);
		res.status(200).send({ message: "Producto agregado al carrito" });
	} else {
		res
			.status(400)
			.send({ error: "No se pudo agregar el producto al carrito" });
	}
};

const putUpdateCart = async (req, res) => {
	const updatedCart = await CartsDAO.updateCart(req.params.cid, req.body);
	if (!updatedCart) {
		res.status(404).send({ error: "Carrito no encontrado" });
		return;
	}
	res.status(200).send(updatedCart);
};

const putUpdateProductInCart = async (req, res) => {
	const { cid, pid } = req.params;
	if (cid && pid) {
		await CartsDAO.CartUpdateProduct(cid, pid, req.body);
	} else {
		res
			.status(400)
			.send({ error: "No se pudo actualizar el producto del carrito" });
	}
};

const deleteCart = async (req, res) => {
	if (!req.params.cid) {
		res.status(404).send({ error: "Carrito no encontrado" });
	}
	await CartsDAO.deleteCart(req.params.cid);
	res.status(200).send({ message: "Carrito eliminado" });
};

const deleteProductFromCart = async (req, res) => {
	const { cid, pid } = req.params;
	if (cid && pid) {
		await CartsDAO.CartDeleteProduct(cid, pid);
		res.status(200).send({ message: "Producto eliminado del carrito" });
	} else {
		res
			.status(400)
			.send({ error: "No se pudo eliminar el producto del carrito" });
	}
};

export const controllersCarts = {
	getAllCarts,
	getCartById,
	postCreateCart,
	postAddProductToCart,
	putUpdateCart,
	putUpdateProductInCart,
	deleteCart,
	deleteProductFromCart,
};
