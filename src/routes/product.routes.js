import { controllersProducts } from "../controllers/products.controller.js";
import { upload } from "../utils/upload.js";
import express from "express";
const router = express.Router();

router.post("/", upload.array("photo", 4), controllersProducts.postImages);
router.delete("/", controllersProducts.deleteImages);
router.delete("/:pid", controllersProducts.deleteImagesProduct);
router.put(
	"/:pid",
	upload.array("photos", 4),
	controllersProducts.putImagesProduct
);

export default router;
