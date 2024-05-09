import ProductsDAO from "../products/products.dao.js";
import CartsDAO from "../carts/carts.dao.js";
import {
	authenticateJWT,
	authRole,
	// authenticate,
} from "../middlewares/authsession.js";
import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
	res.redirect("/login");
});

router.get(
	"/home",
	authenticateJWT,
	// authenticate,
	authRole(["CLIENT", "USER"]),
	async (req, res) => {
		const info = { username: req.user.username, cart: req.user.cart.cid };
		req.session.user = req.user._id;

		const products = await ProductsDAO.getAll({}, { limit: 20 });
		res.render("index", {
			title: "Home || Andy",
			js: "index.js",
			exist_user: !!info,
			info,
			products: products.docs,
		});
	}
);
router.get(
	"/productos/",
	authenticateJWT,
	authRole(["CLIENT", ""]),
	async (req, res) => {
		const info = { username: req.user.username, cart: req.user.cart.cid };
		req.session.user = req.user._id;

		const products = await ProductsDAO.getAll({}, { limit: 20 });
		res.render("shop", {
			title: "Productos || Andy",
			section_title: "PRODUCTOS",
			products: products.docs,
			exist_user: !!info,
			info,
		});
	}
);

router.get(
	"/productos/:section",
	authenticateJWT,
	authRole(["CLIENT", ""]),
	async (req, res) => {
		try {
			const info = { username: req.user.username, cart: req.user.cart.cid };
			req.session.user = req.user._id;

			const query = {};
			const options = {};
			const page = parseInt(req.query.page) || 1;
			const limit = parseInt(req.query.limit) || 20;
			const pricemax = parseInt(req.query.pricemax) || 1000000;
			const pricemin = parseInt(req.query.pricemin) || 0;
			const category = req.query.categoria || "";
			query.price = { $gte: pricemin, $lte: pricemax };
			req.params.section !== "promocion"
				? (query.type = req.params.section)
				: (query.promocion = true);
			if (category !== "") query.category = { $in: category };
			options.page = page;
			options.limit = limit;
			const paginate = await ProductsDAO.getAll(query, options);
			res.render("shop", {
				title: "Productos || Andy",
				section_title: "PRODUCTOS",
				products: paginate.docs,
				exist_user: !!info,
				info,
			});
		} catch (error) {
			console.error("Error al procesar la solicitud:", error);
			res.status(500).send({ error: "Error interno del servidor" });
		}
	}
);

router.get(
	"/productos/:section/:id",
	authenticateJWT,
	authRole(["CLIENT", ""]),
	async (req, res) => {
		try {
			const info = { username: req.user.username, cart: req.user.cart.cid };
			req.session.user = req.user._id;

			const product = await ProductsDAO.getById(req.params.id);
			const stockproduct = product.stock > 0;
			const title = product.title.toLowerCase() + " || Andy";
			if (!product) res.status(404).send({ error: "Producto no encontrado" });
			res.render("product", {
				title,
				product,
				stockproduct,
				exist_user: !!info,
				info,
			});
		} catch (error) {
			console.error("Error al procesar la solicitud:", error);
			res.status(500).render("404");
		}
	}
);

router.get(
	"/contacto",
	authenticateJWT,
	authRole(["CLIENT", ""]),
	(req, res) => {
		const info = { username: req.user.username, cart: req.user.cart.cid };
		req.session.user = req.user._id;

		res.render("contact", {
			title: "Contacto || Andy",
			exist_user: !!info,
			info,
		});
	}
);

router.get("/login", (req, res) => {
	try {
		res.render("login", {
			title: "Login || Andy",
		});
	} catch (error) {
		console.error("Error al procesar la solicitud:", error);
	}
});

router.get(
	"/carrito/:cid",
	authenticateJWT,
	authRole(["CLIENT", ""]),
	async (req, res) => {
		try {
			const info = { username: req.user.username, cart: req.user.cart.cid };
			req.session.user = req.user._id;

			const cid = req.params.cid;
			const totalProd = await CartsDAO.getByIdPopulate(cid);
			const products = totalProd.products.map(e => {
				return { ...e.pid, quantity: e.quantity, _id: e._id };
			});
			res.render("cart", {
				title: "Carrito || Andy",
				products_cart: products,
				exist_user: !!info,
				info,
			});
		} catch (error) {
			console.error("Error al procesar la solicitud:", error);
		}
	}
);

/* PANEL */
router.get(
	"/panel/",
	authenticateJWT,
	authRole(["ADMIN"]),
	async (req, res) => {
		const info = { username: req.user.username, cart: req.user.cart.cid };
		req.session.user = req.user._id;

		const products = await ProductsDAO.getAll();
		res.render("admin/dashboard", {
			title: "Dashboard || Panel",
			products,
			exist_user: !!info,
			info,
		});
	}
);

router.get(
	"/panel/productos",
	authenticateJWT,
	authRole(["ADMIN"]),
	async (req, res) => {
		let products;
		const action = req.query.action;

		if (action === "agregar") {
			res.render("admin/add_prod", {
				title: "Panel | Agregar",
				js: "addProduct.js",
			});
		} else if (action === "editar") {
			products = await ProductsDAO.getById(req.query.pid);
			res.render("admin/put_prod", {
				title: "Panel | Editar",
				product: products,
				prodesc: products.description.replace(/<br>/g, "\n"),
				js: "putProduct.js",
				exist_product: true,
			});
		} else {
			const page = parseInt(req.query.page) || 1;
			products = await ProductsDAO.getAll({}, { page, limit: 6 });
			products.prevLink = products.hasPrevPage
				? `/panel/productos?page=${products.prevPage}`
				: "";
			products.nextLink = products.hasNextPage
				? `/panel/productos?page=${products.nextPage}`
				: "";

			res.render("admin/prod", {
				title: "Panel | Productos",
				products: products.docs.map(product => {
					return {
						...product,
						quantity_photos: product.photo.length,
					};
				}),
				prevLink: products.prevLink,
				nextLink: products.nextLink,
				actualLink: page,
				js: "actionProduct.js",
			});
		}
	}
);

router.get(
	"/panel/mensajes",
	authenticateJWT,
	authRole(["ADMIN"]),
	async (req, res) => {
		res.render("admin/messages_dash", {
			title: "Mensajes || Panel",
			messages: [],
			chat: [],
		});
	}
);
export default router;
