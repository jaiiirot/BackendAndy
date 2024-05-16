import { authorization } from "../middlewares/authorization.js";
import { authentication } from "../middlewares/authencations.js	";
import { controllersCarts } from "./carts.controller.js";
import { Router } from "express";
const router = Router();

// ALL
router.get(
	"/",
	authentication,
	authorization(["CLIENT", "USER", "ADMIN"]),
	controllersCarts.getAllCarts
);
router.post(
	"/",
	authentication,
	authorization(["CLIENT"]),
	controllersCarts.postCreateCart
);

// ID CART
router.get(
	"/:cid",
	authentication,
	authorization(["CLIENT"]),
	controllersCarts.getCartById
);
router.put(
	"/:cid",
	authentication,
	authorization(["CLIENT"]),
	controllersCarts.putUpdateCart
);
router.delete(
	"/:cid",
	authentication,
	authorization(["CLIENT"]),
	controllersCarts.deleteCart
);

// ID CART - ID PRODUCT
router.post(
	"/:cid/productos/:pid",
	authentication,
	authorization(["CLIENT"]),
	controllersCarts.postAddProductToCart
);
router.put(
	"/:cid/productos/:pid",
	authentication,
	authorization(["CLIENT"]),
	controllersCarts.putUpdateProductInCart
);
router.delete(
	"/:cid/productos/:pid",
	authentication,
	authorization(["CLIENT"]),
	controllersCarts.deleteProductFromCart
);

export default router;
