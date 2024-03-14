import ProductsDAO from "../dao/products/products.dao.js";
import {
	authSessionAdmin,
	authSessionUser,
} from "../middlewares/authsession.js";
import CartsDAO from "../dao/carts/carts.dao.js";
import { Router } from "express";
const router = Router();

router.get("/inicio", authSessionUser, (req, res) => {
	res.redirect("/");
});

router.get("/", authSessionUser, async (req, res) => {
	let info;
	if (req.session.user) info = req.session.user;
	const selectionProds = async type =>
		await ProductsDAO.getAll({ genre: type }, { limit: 6 });
	const products = await selectionProds("mujer");
	const productspromo = await selectionProds("hombre");
	res.render("index", {
		title: "Home || Andy",
		js: "index.js",
		exist_user: !!info,
		info,
		products: products.docs,
		products_promo: productspromo.docs,
	});
});
router.get("/productos/", authSessionUser, async (req, res) => {
	let info;
	if (req.session.user) info = req.session.user;
	const products = await ProductsDAO.getAll({}, { limit: 20 });
	res.render("shop", {
		title: "Productos || Andy",
		section_title: "PRODUCTOS",
		products: products.docs,
		exist_user: !!info,
		info,
	});
});

router.get("/productos/:section", authSessionUser, async (req, res) => {
	try {
		let info;
		if (req.session.user) info = req.session.user;
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
});

router.get("/productos/:section/:id", authSessionUser, async (req, res) => {
	try {
		let info;
		if (req.session.user) info = req.session.user;
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
});

router.get("/contacto", authSessionUser, (req, res) => {
	let info;
	if (req.session.user) info = req.session.user;
	res.render("contact", {
		title: "Contacto || Andy",
		exist_user: !!info,
		info,
	});
});

router.get("/login", (req, res) => {
	try {
		res.render("login", {
			title: "Login || Andy",
		});
	} catch (error) {
		console.error("Error al procesar la solicitud:", error);
	}
});
router.get("/logout", (req, res) => {
	try {
		req.session.destroy();
		res.redirect("/");
	} catch (error) {
		console.error("Error al procesar la solicitud:", error);
	}
});

router.get("/carrito/:cid", authSessionUser, async (req, res) => {
	try {
		let info;
		if (req.session.user) info = req.session.user;
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
});

/* PANEL */
router.get("/panel/", authSessionAdmin, async (req, res) => {
	const info = req.session.user;
	// console.log(info);
	const products = await ProductsDAO.getAll();
	res.render("admin/dashboard", {
		title: "Dashboard || Panel",
		products,
		exist_user: !!info,
		info,
	});
});

router.get("/panel/productos", authSessionAdmin, async (req, res) => {
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
});

router.get("/panel/mensajes", authSessionAdmin, async (req, res) => {
	res.render("admin/messages_dash", {
		title: "Mensajes || Panel",
		messages: [],
		chat: [],
	});
});
export default router;
