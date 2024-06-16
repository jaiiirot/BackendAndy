import { authorization } from "../../middlewares/authorization.js";
import { authentication } from "../../middlewares/authencations.js";
import { fsSaveImagesProductsBuffer } from "../../services/upload.js";
import { controllersProducts } from "./products.controller.js";
import express from "express";
const router = express.Router();

router.get(
	"/:pid",
	authentication,
	authorization(["ADMIN"]),
	controllersProducts.getIdProduct
);

router.post(
	"/mocking/productos",
	authentication,
	authorization(["ADMIN"]),
	controllersProducts.getAllMockingProducts
);

router.post(
	"/",
	authentication,
	authorization(["ADMIN"]),
	fsSaveImagesProductsBuffer,
	controllersProducts.postProduct
);

router.delete(
	"/:pid",
	authentication,
	authorization(["ADMIN"]),
	controllersProducts.deleteProduct
);

router.put(
	"/:pid",
	authentication,
	authorization(["ADMIN"]),
	fsSaveImagesProductsBuffer,
	controllersProducts.putProduct
);

export default router;
