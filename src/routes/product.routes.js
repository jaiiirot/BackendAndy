import ProductController from "../dao/products/products.controller.js";
import upload from "../utils/upload.js";
import express from "express";

const router = express.Router();

router.get("/", ProductController.getProducts);

router.post("/", upload.array("photo", 4), ProductController.postProducts);

router.delete("/", ProductController.deleteProducts);

router.delete("/:pid", ProductController.deleteProduct);

router.put("/:pid", upload.array("photos", 4), ProductController.putProduct);

export default router;
