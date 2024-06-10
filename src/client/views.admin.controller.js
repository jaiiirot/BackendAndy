import { productsService } from "../feature/products/repository/products.service.js";
import { ticketsService } from "../feature/tickets/repository/tickets.service.js";
import { logger } from "../utils/logger/logger.js";

const Panel = async (req, res) => {
	try {
		const tickets = await ticketsService.getAll();
		res.render("components/admin/index", {
			layout: "admin",
			admin: {
				title: "Panel",
				tickets,
				...req.infoUser,
			},
		});
		// logger.info("🟢 Panel de administración renderizado con éxito");
	} catch (error) {
		logger.error(
			`🔴 Error al renderizar el panel de administración: ${error.message}`,
			{ stack: error.stack }
		);
		res.status(500).send({ error: "Error interno del servidor" });
	}
};

const PanelProducts = async (req, res) => {
	try {
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
			// logger.info("🟢 Renderizado el formulario para agregar productos");
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
			// logger.info("🟢 Renderizado el formulario para editar productos");
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
			// logger.info("🟢 Productos del panel de administración renderizados con éxito");
		}
	} catch (error) {
		logger.error(
			`🔴 Error al renderizar los productos del panel de administración: ${error.message}`,
			{ stack: error.stack }
		);
		res.status(500).send({ error: "Error interno del servidor" });
	}
};

const PanelMessages = async (req, res) => {
	try {
		res.render("components/admin/chats", {
			layout: "admin",
			admin: {
				title: "Mensajes || Panel",
				messages: [],
				chat: [],
			},
		});
		// logger.info("🟢 Página de mensajes del panel de administración renderizada con éxito");
	} catch (error) {
		logger.error(
			`🔴 Error al renderizar la página de mensajes del panel de administración: ${error.message}`,
			{ stack: error.stack }
		);
		res.status(500).send({ error: "Error interno del servidor" });
	}
};

export const controllersViewAdmin = {
	Panel,
	PanelProducts,
	PanelMessages,
};
