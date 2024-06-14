import { productsService } from "./repository/products.service.js";
import { generateListProducts } from "../../utils/mocks/mocks.js";
import { logger } from "../../utils/logger/logger.js";

const redirectToPanel = (res, status, message) => {
	const redirectUrl = `/panel/productos?st=${message}`;
	res.status(status).redirect(redirectUrl);
};

const postProduct = async (req, res) => {
	try {
		logger.info("C: ➕ Intentando agregar un nuevo producto");
		console.log(req.body, req.files);
		if (!req.body && (!req.body.photoUrl || !req.files)) {
			logger.warning("C: ⚠️ Datos insuficientes para agregar el producto");
			return redirectToPanel(res, 400, "postfailed");
		}
		await productsService.post(req.body, req.files);
		logger.info("C: 🆕 Producto agregado correctamente");
		redirectToPanel(res, 200, "postsuccess");
	} catch (error) {
		logger.error("C: 🔴 Error al agregar producto:", error);
		redirectToPanel(res, 500, "failed");
	}
};

const deleteProduct = async (req, res) => {
	try {
		logger.info(
			`C: 🗑️ Intentando eliminar el producto con ID ${req.params.pid}`
		);
		if (!req.params.pid) {
			logger.warning("C: ⚠️ ID de producto no proporcionado");
			return redirectToPanel(res, 400, "failed");
		}
		await productsService.delete(req.params.pid);
		logger.info(
			`C: 🗑️ Producto con ID ${req.params.pid} eliminado correctamente`
		);
		redirectToPanel(res, 200, "deletesuccess");
	} catch (error) {
		logger.error(
			`C: 🔴 Error al eliminar producto con ID ${req.params.pid}:`,
			error
		);
		redirectToPanel(res, 500, "deletefailed");
	}
};

const putProduct = async (req, res) => {
	try {
		logger.info(
			`C: 🔄 Intentando actualizar el producto con ID ${req.params.pid}`
		);
		console.log(req.body, req.files);
		if (!req.body || !req.params.pid) {
			logger.warning("C: ⚠️ Datos insuficientes para actualizar el producto");
			return redirectToPanel(res, 400, "updatefailed");
		}
		await productsService.put(req.params.pid, req.body, req.files);
		logger.info(
			`C: 🔄 Producto con ID ${req.params.pid} actualizado correctamente`
		);
		redirectToPanel(res, 200, "updatesuccess");
	} catch (error) {
		logger.error(
			`C: 🔴 Error al actualizar producto con ID ${req.params.pid}:`,
			error
		);
		redirectToPanel(res, 500, "updatefailed");
	}
};

const getAllMockingProducts = async (req, res) => {
	try {
		logger.info("C: 🔍 Intentando obtener todos los productos mock");
		const result = await generateListProducts();
		if (!result) {
			logger.error("C: 🔴 Error al obtener todos los productos mock");
			return res.send({ status: "error", payload: [] });
		}
		logger.info("C: 🛍️ Productos mock obtenidos correctamente");
		await productsService.insertMany(result);
		res.send({ status: "success", payload: [...result] });
	} catch (error) {
		logger.error("C: 🔴 Error al obtener todos los productos mock:", error);
		res.send({ status: "error", payload: [] });
	}
};

export const controllersProducts = {
	postProduct,
	deleteProduct,
	putProduct,
	getAllMockingProducts,
};
