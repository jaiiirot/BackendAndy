import { productsService } from "./repository/products.service.js";
import { generateListProducts } from "../../utils/mocks/mocks.js";
import { logger } from "../../utils/logger/logger.js";

const postProduct = async (req, res) => {
	try {
		logger.info("C: ➕ Intentando agregar un nuevo producto");
		// console.log(req.body, req.files);
		if (!req.body && (!req.body.photoUrl || !req.files)) {
			logger.warning("C: ⚠️ Datos insuficientes para agregar el producto");
			res
				.status(400)
				.send({ msg: "Datos insuficientes para agregar el producto" });
		}
		const payload = await productsService.post(req.body, req.files);
		logger.info("C: 🆕 Producto agregado correctamente");
		res.status(200).send({ msg: "Producto agregado correctamente", payload });
	} catch (error) {
		logger.error("C: 🔴 Error al agregar producto:", error);
		// redirectToPanel(res, 500, "failed");
		res.status(500).send({ msg: "Error al agregar el producto" });
	}
};

const deleteProduct = async (req, res) => {
	try {
		logger.info(
			`C: 🗑️ Intentando eliminar el producto con ID ${req.params.pid}`
		);
		if (!req.params.pid) {
			logger.warning("C: ⚠️ ID de producto no proporcionado");
			res.status(400).send({ msg: "ID de producto no proporcionado" });
		}
		const response = await productsService.delete(req.params.pid);
		if (!response) {
			logger.error(
				`C: 🔴 Error al eliminar el producto con ID ${req.params.pid}`
			);
			res.status(404).send({ msg: "Error al eliminar el producto" });
		}
		logger.info(
			`C: 🗑️ Producto con ID ${req.params.pid} eliminado correctamente`
		);
		res.status(200).send({ msg: "Producto eliminado correctamente" });
	} catch (error) {
		logger.error(
			`C: 🔴 Error al eliminar producto con ID ${req.params.pid}:`,
			error
		);
		res.status(500).send({ msg: "Error al eliminar el producto" });
	}
};

const putProduct = async (req, res) => {
	try {
		logger.info(
			`C: 🔄 Intentando actualizar el producto con ID ${req.params.pid}`
		);
		// console.log(req.body);
		if (!req.body || !req.params.pid) {
			logger.warning("C: ⚠️ Datos insuficientes para actualizar el producto");
			res.status(400).send({ msg: "Datos insuficientes para actualizar" });
		}
		await productsService.put(req.params.pid, req.body, req.files);
		logger.info(
			`C: 🔄 Producto con ID ${req.params.pid} actualizado correctamente`
		);
		res.status(200).send({ msg: "Producto actualizado correctamente" });
	} catch (error) {
		logger.error(
			`C: 🔴 Error al actualizar producto con ID ${req.params.pid}:`,
			error
		);
		res.status(500).send({ msg: "Error al actualizar el producto" });
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

const getIdProduct = async (req, res) => {
	try {
		logger.info(
			`C: 🔍 Intentando obtener el producto con ID ${req.params.pid}`
		);
		const result = await productsService.getById(req.params.pid);
		if (!result) {
			logger.error(
				`C: 🔴 Error al obtener el producto con ID ${req.params.pid}`
			);
			return res.status(404).send({ status: "error", payload: {} });
		}
		logger.info(
			`C: 🛍️ Producto con ID ${req.params.pid} obtenido correctamente`
		);
		res.status(200).send({
			status: "success",
			payload: { ...result },
			msg: "¡Producto obtenido correctamente!",
		});
	} catch (error) {
		logger.error(
			`C: 🔴 Error al obtener el producto con ID ${req.params.pid}:`,
			error
		);
		res.status(500).send({ status: "error", payload: {} });
	}
};

export const controllersProducts = {
	getIdProduct,
	postProduct,
	deleteProduct,
	putProduct,
	getAllMockingProducts,
};
