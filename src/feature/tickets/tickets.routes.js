import { authorization } from "../../middlewares/authorization.js";
import { authentication } from "../../middlewares/authencations.js";
import { controllersTickets } from "./tickets.controller.js";
import express from "express";
const router = express.Router();

router.get(
	"/",
	authentication,
	authorization(["ADMIN"]),
	controllersTickets.getAll
);

router.post(
	"/",
	authentication,
	authorization(["CLIENT"]),
	controllersTickets.postTicket
);

router.get(
	"/:id",
	authentication,
	authorization(["ADMIN", "CLIENT"]),
	controllersTickets.getTicket
);

router.put(
	"/:id",
	authentication,
	authorization(["ADMIN"]),
	controllersTickets.putTicket
);

router.delete(
	"/:id",
	authentication,
	authorization(["ADMIN", "CLIENT"]),
	controllersTickets.deleteTicket
);

export default router;
