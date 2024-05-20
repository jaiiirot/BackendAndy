import { authorization } from "../middlewares/authorization.js";
import { authentication } from "../middlewares/authencations.js	";
import { controllersViewClient } from "./views.client.controller.js";
import { controllersViewAdmin } from "./views.admin.controller.js";
import { controllersViewforms } from "./views.form.controller.js";
import { Router } from "express";
const router = Router();

router.get("/inicio", controllersViewClient.RedirectHome);

router.get(
	"/",
	authentication,
	authorization(["CLIENT", "USER"]),
	controllersViewClient.Home
);

router.get(
	"/productos/",
	authentication,
	authorization(["CLIENT", "USER"]),
	controllersViewClient.Products
);

router.get(
	"/productos/:section",
	authentication,
	authorization(["CLIENT", "USER"]),
	controllersViewClient.ProductsSection
);

router.get(
	"/productos/:section/:id",
	authentication,
	authorization(["CLIENT", "USER"]),
	controllersViewClient.ProductDetail
);

router.get(
	"/contacto",
	authentication,
	authorization(["CLIENT", "USER"]),
	controllersViewClient.Contact
);

router.get(
	"/carrito/:cid/purchase",
	authentication,
	authorization(["CLIENT"]),
	controllersViewClient.CardID
);

router.get("/login", controllersViewforms.Login);
router.get("/register", controllersViewforms.Register);

/* PANEL */
router.get(
	"/panel/",
	authentication,
	authorization(["ADMIN"]),
	controllersViewAdmin.Panel
);

router.get(
	"/panel/productos",
	authentication,
	authorization(["ADMIN"]),
	controllersViewAdmin.PanelProducts
);

router.get(
	"/panel/chat",
	authentication,
	authorization(["ADMIN"]),
	controllersViewAdmin.PanelMessages
);

export default router;
