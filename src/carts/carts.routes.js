import { controllersCarts } from "./carts.controller.js";
import { Router } from "express";
const router = Router();

// ALL
router.get("/", controllersCarts.getAllCarts);
router.post("/", controllersCarts.postCreateCart);

// ID CART
router.get("/:cid", controllersCarts.getCartById);
router.put("/:cid", controllersCarts.putUpdateCart);
router.delete("/:cid", controllersCarts.deleteCart);

// ID CART - ID PRODUCT
router.post("/:cid/productos/:pid", controllersCarts.postAddProductToCart);
router.put("/:cid/productos/:pid", controllersCarts.putUpdateProductInCart);
router.delete("/:cid/productos/:pid", controllersCarts.deleteProductFromCart);

export default router;
