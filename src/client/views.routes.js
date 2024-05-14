import { authentication, authorization } from "../middlewares/authsession.js";
import { controllersViewClient } from "./views.client.controller.js";
import { controllersViewAdmin } from "./views.admin.controller.js";
import { Router } from "express";
const router = Router();

router.get("/", controllersViewClient.Home);

router.get(
	"/home",
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

router.get("/login", controllersViewClient.Login);

router.get(
	"/carrito/:cid",
	authentication,
	authorization(["CLIENT"]),
	controllersViewClient.CardID
);

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
	"/panel/mensajes",
	authentication,
	authorization(["ADMIN"]),
	controllersViewAdmin.PanelMessages
);

export default router;
