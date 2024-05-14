import ProductsDAO from "../products/products.dao.js";
import CartsDAO from "../carts/carts.dao.js";

const RedirectHome = (req, res) => {
	res.redirect("/login");
};

const Home = async (req, res) => {
	try {
		const infoUser = req.sessionUser || false;
		const products = await ProductsDAO.getAll({}, { limit: 20 });

		res.render("index", {
			title: "Home || Andy",
			js: "index.js",
			products: products.docs,
			info: infoUser,
			exist_user: infoUser,
		});
	} catch (error) {
		console.error("Error al procesar la solicitud:", error);
	}
};

const Products = async (req, res) => {
	try {
		const infoUser = req.sessionUser || false;
		const products = await ProductsDAO.getAll({}, { limit: 20 });

		res.render("shop", {
			title: "Productos || Andy",
			section_title: "PRODUCTOS",
			products: products.docs,
			info: infoUser,
			exist_user: infoUser,
		});
	} catch (error) {
		console.error("Error al procesar la solicitud:", error);
		res.redirect("/login");
	}
};

const ProductsSection = async (req, res) => {
	try {
		const infoUser = req.sessionUser || false;

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
			exist_user: infoUser,
			info: infoUser,
		});
	} catch (error) {
		console.error("Error al procesar la solicitud:", error);
		res.status(500).send({ error: "Error interno del servidor" });
	}
};

const ProductDetail = async (req, res) => {
	try {
		const infoUser = req.sessionUser || false;

		const product = await ProductsDAO.getById(req.params.id);
		const stockproduct = product.stock > 0;
		const title = product.title.toLowerCase() + " || Andy";
		if (!product) res.status(404).send({ error: "Producto no encontrado" });
		res.render("product", {
			title,
			product,
			stockproduct,
			exist_user: infoUser,
			info: infoUser,
		});
	} catch (error) {
		console.error("Error al procesar la solicitud:", error);
		res.status(500).render("404");
	}
};

const Contact = (req, res) => {
	const infoUser = req.sessionUser || false;

	res.render("contact", {
		title: "Contacto || Andy",
		exist_user: infoUser,
		info: infoUser,
	});
};

const Login = (req, res) => {
	try {
		res.render("login", {
			title: "Login || Andy",
		});
	} catch (error) {
		console.error("Error al procesar la solicitud:", error);
	}
};

const CardID = async (req, res) => {
	try {
		const infoUser = req.sessionUser || false;

		const cid = req.params.cid;
		const totalProd = await CartsDAO.getByIdPopulate(cid);
		const products = totalProd.products.map(e => {
			return { ...e.pid, quantity: e.quantity, _id: e._id };
		});
		res.render("cart", {
			title: "Carrito || Andy",
			products_cart: products,
			exist_user: infoUser,
			info: infoUser,
		});
	} catch (error) {
		console.error("Error al procesar la solicitud:", error);
	}
};

export const controllersViewClient = {
	RedirectHome,
	Home,
	Products,
	ProductsSection,
	ProductDetail,
	Contact,
	Login,
	CardID,
};