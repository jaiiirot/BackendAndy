import { Router } from "express";
import { authorization } from "../../middlewares/authorization.js";
import { authentication } from "../../middlewares/authencations.js";
import { controllerUsers } from "./users.controller.js";
import { uploadBuffer } from "../../services/upload.js";

const router = Router();
router.get("/", controllerUsers.getAllUsersCondition);

router.delete(
	"/time",
	authentication,
	authorization(["ADMIN"]),
	controllerUsers.deleteAllUserTwoDays
);

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
	controllerUsers.putUserRole
);
router.post(
	"/documents/:uid",
	authentication,
	authorization(["CLIENT"]),
	uploadBuffer.array("documents", 3),
	controllerUsers.postDocuments
);
router.put(
	"/profile/:uid",
	authentication,
	authorization(["CLIENT"]),
	uploadBuffer.single("profile"),
	controllerUsers.putUserProfile
);

export default router;
