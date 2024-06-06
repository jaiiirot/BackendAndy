import { cartsService } from "./repository/carts.service.js";

const getAllCarts = async (req, res) => {
	const carts = await cartsService.getAll();
	res.status(200).send(carts);
};

const getCartById = async (req, res) => {
	const cart = await cartsService.getByIdPopulate(req.params.cid);
	if (!cart) {
		res.status(404).send({ error: "Carrito no encontrado" });
		return;
	}
	res.status(200).send(cart);
};

const getProductToCart = async (req, res) => {
	try {
		const { cid, pid } = req.params;
		const product = await cartsService.getProductToCart(cid, pid);
		if (!product)
			res.status(404).send({ error: "Producto no encontrado en el carrito" });

		res.status(200).send(product);
	} catch {
		res.status(404).send({ error: "Producto no encontrado en el carrito" });
	}
};

const postCreateCart = async (req, res) => {
	const newCart = await cartsService.post(req.body);
	res.status(201).send(newCart);
};

const postAddProductToCart = async (req, res) => {
	const { cid, pid } = req.params;
	if (cid && pid) {
		await cartsService.postAddProductToCart(cid, pid);
		res.status(200).send({ message: "Producto agregado al carrito" });
	} else {
		res
			.status(400)
			.send({ error: "No se pudo agregar el producto al carrito" });
	}
};

const putUpdateCart = async (req, res) => {
	const updatedCart = await cartsService.put(req.params.cid, req.body);
	if (!updatedCart) {
		res.status(404).send({ error: "Carrito no encontrado" });
		return;
	}
	res.status(200).send(updatedCart);
};

const putUpdateProductInCart = async (req, res) => {
	try {
		const { cid, pid } = req.params;
		if (cid && pid) {
			await cartsService.putUpdateProductInCart(cid, pid, req.query.action);
			res.status(200).send({
				msg: "Producto actualizado en el carrito",
			});
		} else {
			res
				.status(400)
				.send({ error: "No se pudo actualizar el producto del carrito" });
		}
	} catch {
		res
			.status(400)
			.send({ error: "No se pudo actualizar el producto del carrito" });
	}
};

const deleteCart = async (req, res) => {
	if (!req.params.cid) {
		res.status(404).send({ error: "Carrito no encontrado" });
	}
	await cartsService.delete(req.params.cid);
	res.status(200).send({ message: "Carrito eliminado" });
};

const deleteProductFromCart = async (req, res) => {
	const { cid, pid } = req.params;
	if (cid && pid) {
		await cartsService.deleteProductInCart(cid, pid);
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
	getProductToCart,
	postCreateCart,
	postAddProductToCart,
	putUpdateCart,
	putUpdateProductInCart,
	deleteCart,
	deleteProductFromCart,
};
