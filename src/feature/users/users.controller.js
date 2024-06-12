import { usersService } from "./repository/users.service.js";
import { logger } from "../../utils/logger/logger.js";

const putUser = async (req, res) => {
	try {
		logger.info(`🔄 Actualizando usuario con ID ${req.params.uid}`);
		const user = await usersService.putRole(req.params.uid, req.body.role);
		if (user) {
			logger.info("✅ Usuario actualizado correctamente");
			res.status(200).json({ msg: "Usuario actualizado correctamente" });
		} else {
			logger.error("🔴 Error al actualizar el usuario");
			res.status(400).json({ msg: "Error al actualizar el usuario" });
		}
	} catch (error) {
		logger.error("🔴 Error al actualizar el usuario:", error);
		res.status(500).json({ msg: "Error interno del servidor" });
	}
};

const deleteUser = async (req, res) => {
	try {
		logger.info(`🗑️ Eliminando usuario con ID ${req.params.uid}`);
		const user = await usersService.delete(req.params.uid);
		if (user) {
			logger.info("🗑️ Usuario eliminado correctamente");
			res.status(200).json({ msg: "Usuario eliminado correctamente" });
		} else {
			logger.error("🔴 Error al eliminar el usuario");
			res.status(400).json({ msg: "Error al eliminar el usuario" });
		}
	} catch (error) {
		logger.error("🔴 Error al eliminar el usuario:", error);
		res.status(500).json({ msg: "Error interno del servidor" });
	}
};

export const controllerUsers = {
	putUser,
	deleteUser,
};
