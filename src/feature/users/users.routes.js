import { Router } from "express";
import { authorization } from "../../middlewares/authorization.js";
import { authentication } from "../../middlewares/authencations.js";
import { controllerUsers } from "./users.controller.js";

const router = Router();

router.delete(
	"/:uid",
	authentication,
	authorization(["ADMIN"]),
	controllerUsers.deleteUser
);
router.put(
	"/premium/:uid",
	authentication,
	authorization(["ADMIN"]),
	controllerUsers.putUser
);
export default router;
