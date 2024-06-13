import { authorization } from "../../middlewares/authorization.js";
import { authentication } from "../../middlewares/authencations.js";
import { handleFileUploadAndSave } from "../../services/upload.js";
import { controllersProducts } from "./products.controller.js";
import express from "express";
const router = express.Router();

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
	handleFileUploadAndSave,
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
	handleFileUploadAndSave,
	controllersProducts.putProduct
);

export default router;
