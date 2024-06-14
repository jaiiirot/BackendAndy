import { Router } from "express";
import { authorization } from "../../middlewares/authorization.js";
import { authentication } from "../../middlewares/authencations.js";
import { controllerUsers } from "./users.controller.js";
import {
	fsSaveDocumentsBuffer,
	fsSaveProfileImageBuffer,
} from "../../services/upload.js";

const router = Router();
router.get("/", controllerUsers.getAllUsersCondition);

router.delete("/", controllerUsers.deleteAllUserTwoDays);

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
	fsSaveDocumentsBuffer,
	controllerUsers.postDocument
);
router.put(
	"/profile/:uid",
	authentication,
	authorization(["CLIENT"]),
	fsSaveProfileImageBuffer,
	controllerUsers.putUserProfile
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
	fsSaveDocumentsBuffer,
	controllerUsers.postDocument
);
router.put(
	"/profile/:uid",
	authentication,
	authorization(["CLIENT"]),
	fsSaveProfileImageBuffer,
	controllerUsers.putUserProfile
);
export default router;
