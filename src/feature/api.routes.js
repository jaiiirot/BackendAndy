import routerProd from "./products/products.routes.js";
import routerUser from "./users/sessions.routes.js";
import routerCart from "./carts/carts.routes.js";
import routerMessage from "./messages/messages.routes.js";
import routerTicket from "./tickets/tickets.routes.js";

export default {
	products: routerProd,
	users: routerUser,
	carts: routerCart,
	messages: routerMessage,
	tickets: routerTicket,
};
