import { productsService } from "../feature/products/repository/products.service.js";

const Panel = async (req, res) => {
	const products = await productsService.getAll();
	res.render("components/admin/index", {
		layout: "admin",
		admin: {
			title: "Panel",
			products,
			...req.infoUser,
		},
	});
};

const PanelProducts = async (req, res) => {
	let products;
	const action = req.query.action;
	if (action === "agregar") {
		res.render("components/admin/addprod", {
			layout: "admin",
			admin: {
				title: "Panel | Agregar",
				...req.infoUser,
			},
		});
	} else if (action === "editar") {
		products = await productsService.getById(req.query.pid);
		res.render("components/admin/putprod", {
			layout: "admin",
			admin: {
				title: "Panel | Editar",
				product: products,
				...req.infoUser,
				exist_product: true,
			},
		});
	} else {
		const page = parseInt(req.query.page) || 1;
		products = await productsService.getAll({}, { page, limit: 10 });
		products.prevLink = products.hasPrevPage
			? `/panel/productos?page=${products.prevPage}`
			: "";
		products.nextLink = products.hasNextPage
			? `/panel/productos?page=${products.nextPage}`
			: "";

		res.render("components/admin/products", {
			layout: "admin",
			admin: {
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
				...req.infoUser,
			},
		});
	}
};

const PanelMessages = async (req, res) => {
	res.render("components/admin/chats", {
		layout: "admin",
		admin: {
			title: "Mensajes || Panel",
			messages: [],
			chat: [],
		},
	});
};

export const controllersViewAdmin = {
	Panel,
	PanelProducts,
	PanelMessages,
};
