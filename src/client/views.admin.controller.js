import ProductsDAO from "../products/products.dao.js";

const Panel = async (req, res) => {
	const infoUser = req.sessionUser || false;
	req.session.user = req.user._id;

	const products = await ProductsDAO.getAll();
	res.render("admin/dashboard", {
		title: "Dashboard || Panel",
		products,
		info: infoUser,
		exist_user: infoUser,
	});
};

const PanelProducts = async (req, res) => {
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
};

const PanelMessages = async (req, res) => {
	res.render("admin/messages_dash", {
		title: "Mensajes || Panel",
		messages: [],
		chat: [],
	});
};

export const controllersViewAdmin = {
	Panel,
	PanelProducts,
	PanelMessages,
};
