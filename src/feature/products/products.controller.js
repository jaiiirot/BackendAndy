import { productsService } from "./repository/products.service.js";
import { generateListProducts } from "../../utils/mocks/mocks.js";
import { logger } from "../../utils/logger/logger.js";

const redirectToPanel = (res, status, message) => {
	const redirectUrl = `/panel/productos?st=${message}`;
	res.status(status).redirect(redirectUrl);
};

const postProduct = async (req, res) => {
	try {
		logger.info("➕ Intentando agregar un nuevo producto");
		console.log(req.body, req.files);
		if (!req.body && (!req.body.photoUrl || !req.files)) {
			logger.warning("⚠️ Datos insuficientes para agregar el producto");
			return redirectToPanel(res, 400, "postfailed");
		}
		await productsService.post(req.body, req.files);
		logger.info("🆕 Producto agregado correctamente");
		redirectToPanel(res, 200, "postsuccess");
	} catch (error) {
		logger.error("🔴 Error al agregar producto:", error);
		redirectToPanel(res, 500, "failed");
	}
};

const deleteProduct = async (req, res) => {
	try {
		logger.info(`🗑️ Intentando eliminar el producto con ID ${req.params.pid}`);
		if (!req.params.pid) {
			logger.warning("⚠️ ID de producto no proporcionado");
			return redirectToPanel(res, 400, "failed");
		}
		await productsService.delete(req.params.pid);
		logger.info(`🗑️ Producto con ID ${req.params.pid} eliminado correctamente`);
		redirectToPanel(res, 200, "deletesuccess");
	} catch (error) {
		logger.error(
			`🔴 Error al eliminar producto con ID ${req.params.pid}:`,
			error
		);
		redirectToPanel(res, 500, "deletefailed");
	}
};

const putProduct = async (req, res) => {
	try {
		logger.info(
			`🔄 Intentando actualizar el producto con ID ${req.params.pid}`
		);
		console.log(req.body, req.files);
		if (!req.body || !req.params.pid) {
			logger.warning("⚠️ Datos insuficientes para actualizar el producto");
			return redirectToPanel(res, 400, "updatefailed");
		}
		await productsService.put(req.params.pid, req.body, req.files);
		logger.info(
			`🔄 Producto con ID ${req.params.pid} actualizado correctamente`
		);
		redirectToPanel(res, 200, "updatesuccess");
	} catch (error) {
		logger.error(
			`🔴 Error al actualizar producto con ID ${req.params.pid}:`,
			error
		);
		redirectToPanel(res, 500, "updatefailed");
	}
};

const getAllMockingProducts = async (req, res, next) => {
	try {
		logger.info("🔍 Intentando obtener todos los productos mock");
		const result = await generateListProducts();
		if (!result) {
			logger.error("🔴 Error al obtener todos los productos mock");
			return res.send({ status: "error", payload: [] });
		}
		logger.info("🛍️ Productos mock obtenidos correctamente");
		res.send({ status: "success", payload: [...result] });
	} catch (error) {
		logger.error("🔴 Error al obtener todos los productos mock:", error);
		next(error);
	}
};

export const controllersProducts = {
	postProduct,
	deleteProduct,
	putProduct,
	getAllMockingProducts,
};
