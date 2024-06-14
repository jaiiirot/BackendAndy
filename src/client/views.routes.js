import { authorization } from "../middlewares/authorization.js";
import { authentication } from "../middlewares/authencations.js	";
import { controllersViewClient } from "./views.client.controller.js";
import { controllersViewAdmin } from "./views.admin.controller.js";
import { controllersViewforms } from "./views.form.controller.js";

import { servicesExternal } from "../services/repository/external.service.js";

import { Router } from "express";
const router = Router();

router.get("/inicio", controllersViewClient.RedirectHome);

router.get(
	"/",
	authentication,
	authorization(["CLIENT", "USER", "PREMIUM"]),
	controllersViewClient.Home
);

router.get(
	"/productos/",
	authentication,
	authorization(["CLIENT", "USER", "PREMIUM"]),
	controllersViewClient.Products
);

router.get(
	"/productos/:section",
	authentication,
	authorization(["CLIENT", "USER", "PREMIUM"]),
	controllersViewClient.ProductsSection
);

router.get(
	"/productos/:section/:id",
	authentication,
	authorization(["CLIENT", "USER", "PREMIUM"]),
	controllersViewClient.ProductDetail
);

router.get(
	"/pedidos",
	authentication,
	authorization(["CLIENT", "PREMIUM"]),
	controllersViewClient.Tickets
);

router.get(
	"/contacto",
	authentication,
	authorization(["USER"]),
	controllersViewClient.Contact
);

router.get(
	"/carrito/:cid/purchase",
	authentication,
	authorization(["CLIENT", "PREMIUM"]),
	controllersViewClient.CardID
);

// FORMS

router.get("/login", controllersViewforms.Login);
router.get("/register", controllersViewforms.Register);
router.get("/forget", controllersViewforms.Forget);
router.get(
	"/reset/password/:token",
	(req, res, next) => {
		if (!req.params.token) res.redirect("/forget/");
		if (!servicesExternal.getToken(req.signedCookies.token))
			res.redirect("/forget/");
		req.userreset = servicesExternal.getToken(req.signedCookies.token);
		next();
	},
	controllersViewforms.Reset
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
	"/panel/chat",
	authentication,
	authorization(["ADMIN"]),
	controllersViewAdmin.PanelMessages
);

router.get(
	"/panel/usuarios",
	authentication,
	authorization(["ADMIN"]),
	controllersViewAdmin.PanelUsers
);

export default router;
