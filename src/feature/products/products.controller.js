import { productsService } from "./repository/products.service.js";
import { generateListProducts } from "../../utils/mocks.js";

const redirectToPanel = (res, status, message) => {
	const redirectUrl = `/panel/productos?st=${message}`;
	res.status(status).redirect(redirectUrl);
};

const postProduct = async (req, res) => {
	try {
		if (!req.body || !req.body.photoUrl) {
			return redirectToPanel(res, 400, "postfailed");
		}
		await productsService.post(req.body, req.files);
		redirectToPanel(res, 200, "postsuccess");
	} catch (error) {
		console.error("Error al obtener todos los productos:", error);
		redirectToPanel(res, 500, "failed");
	}
};

const deleteProduct = async (req, res) => {
	try {
		if (!req.params.pid) {
			return redirectToPanel(res, 400, "failed");
		}
		await productsService.delete(req.params.pid);
		redirectToPanel(res, 200, "deletesuccess");
	} catch (error) {
		console.error("Error al eliminar productos:", error);
		redirectToPanel(res, 500, "deletefailed");
	}
};

const putProduct = async (req, res) => {
	try {
		if (!req.body || !req.params.pid) {
			return redirectToPanel(res, 400, "updatefailed");
		}
		await productsService.put(req.params.pid, req.body, req.files);
		redirectToPanel(res, 200, "updatesuccess");
	} catch (error) {
		console.error("Error al actualizar el producto:", error);
		redirectToPanel(res, 500, "updatefailed");
	}
};

const getAllMockingProducts = async (req, res, next) => {
	try {
		const result = await generateListProducts();

		res.send({ status: "sucess", payload: [...result] });
	} catch (error) {
		next(error);
	}
};

export const controllersProducts = {
	postProduct,
	deleteProduct,
	putProduct,

	getAllMockingProducts,
};
