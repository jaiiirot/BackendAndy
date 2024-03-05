import ProductsDAO from "../dao/products/products.dao.js";
import CartsDAO from "../dao/carts/carts.dao.js";
import { Router } from "express";
const router = Router();

router.get("/inicio", (req, res) => {
	res.redirect("/");
});

router.get("/", async (req, res) => {
	const selectionProds = async type =>
		await ProductsDAO.getAll({ category: type }, { limit: 6 });
	const products = await selectionProds("mujer");
	const productspromo = await selectionProds("hombre");
	res.render("index", {
		title: "Home || Andy",
		js: "index.js",
		products: products.docs,
		products_promo: productspromo.docs,
	});
});

router.get("/productos", async (req, res) => {
	try {
		console.log("querys:", req.query);
		const query = {};
		const options = {};
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 20;
		const pricemax = parseInt(req.query.pricemax) || 1000000;
		const pricemin = parseInt(req.query.pricemin) || 0;
		const category = req.query.categoria || "";
		const promocion = req.query.promocion || null;
		query.price = { $gte: pricemin, $lte: pricemax };
		if (category !== "") {
			query.category = { $in: category };
		}
		if (promocion !== null) {
			query.promocion = promocion === "true";
		}
		console.log("Consulta de productos:", query);
		options.page = page;
		options.limit = limit;
		const paginate = await ProductsDAO.getAll(query, options);
		res.render("shop", {
			title: "Productos || Andy",
			section_title: "PRODUCTOS",
			products: paginate.docs,
		});
	} catch (error) {
		console.error("Error al procesar la solicitud:", error);
		res.status(500).send({ error: "Error interno del servidor" });
	}
});

router.get("/productos/:id", async (req, res) => {
	try {
		const product = await ProductsDAO.getById(req.params.id);
		const stockproduct = product.stock > 0;
		const title = product.title.toLowerCase() + " || Andy";
		if (!product) res.status(404).send({ error: "Producto no encontrado" });
		res.render("product", { title, product, stockproduct });
	} catch (error) {
		console.error("Error al procesar la solicitud:", error);
		res.status(500).render("404");
	}
});

router.get("/contacto", (req, res) => {
	res.render("contact", {
		title: "Contacto || Andy",
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

router.get("/carrito/:cid", async (req, res) => {
	try {
		const cid = req.params.cid;
		const totalProd = await CartsDAO.getByIdPopulate(cid);
		const products = totalProd.products.map(e => {
			return { ...e.pid, quantity: e.quantity, _id: e._id };
		});
		res.render("cart", {
			title: "Carrito || Andy",
			products_cart: products,
		});
	} catch (error) {
		console.error("Error al procesar la solicitud:", error);
	}
});

/* PANEL */
router.get("/panel/", async (req, res) => {
	const products = await ProductsDAO.getAll();
	res.render("admin/dashboard", {
		title: "Dashboard || Panel",
		products,
		js: "dashboard.js",
	});
});

router.get("/panel/productos", async (req, res) => {
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

router.get("/panel/mensajes", async (req, res) => {
	res.render("admin/messages_dash", {
		title: "Mensajes || Panel",
		messages: [],
		chat: [],
	});
});
export default router;
