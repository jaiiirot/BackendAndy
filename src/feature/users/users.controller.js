import { usersService } from "./repository/users.service.js";
import { logger } from "../../utils/logger/logger.js";

const postDocument = async (req, res) => {
	try {
		logger.info(
			`C: 📄 Subiendo documento para el usuario con ID ${req.params.uid}`
		);
		console.log(req.file);
		const user = await usersService.postDocument(
			req.params.uid,
			req.uploadedFilePath.doc
		);
		if (user) {
			logger.info("C: ✅ Documento subido correctamente");
			res.status(200).json({ msg: "Documento subido correctamente" });
		} else {
			logger.error("C: 🔴 Error al subir el documento");
			res.status(400).json({ msg: "Error al subir el documento" });
		}
	} catch (error) {
		logger.error("C: 🔴 Error al subir el documento:", error);
		res.status(500).json({ msg: "Error interno del servidor" });
	}
};

const putUserRole = async (req, res) => {
	try {
		logger.info(`C: 🔄 Actualizando usuario con ID ${req.params.uid}`);
		const user = await usersService.putRole(req.params.uid, req.body.role);
		if (user) {
			logger.info("C: ✅ Usuario actualizado correctamente");
			res.status(200).json({ msg: "Usuario actualizado correctamente" });
		} else {
			logger.error("C: 🔴 Error al actualizar el usuario");
			res.status(400).json({ msg: "Error al actualizar el usuario" });
		}
	} catch (error) {
		logger.error("C: 🔴 Error al actualizar el usuario:", error);
		res.status(500).json({ msg: "Error interno del servidor" });
	}
};

const putUserProfile = async (req, res) => {
	try {
		logger.info(`C: 🔄 Actualizando usuario con ID ${req.params.uid}`);
		const user = await usersService.putProfile(req.params.uid, req.body);
		if (user) {
			logger.info("C: ✅ Usuario actualizado correctamente");
			res.status(200).json({ msg: "Usuario actualizado correctamente" });
		} else {
			logger.error("C: 🔴 Error al actualizar el usuario");
			res.status(400).json({ msg: "Error al actualizar el usuario" });
		}
	} catch (error) {
		logger.error("C: 🔴 Error al actualizar el usuario:", error);
		res.status(500).json({ msg: "Error interno del servidor" });
	}
};

const deleteUser = async (req, res) => {
	try {
		logger.info(`C: 🗑️ Eliminando usuario con ID ${req.params.uid}`);
		const user = await usersService.delete(req.params.uid);
		if (user) {
			logger.info("C: 🗑️ Usuario eliminado correctamente");
			res.status(200).json({ msg: "Usuario eliminado correctamente" });
		} else {
			logger.error("C: 🔴 Error al eliminar el usuario");
			res.status(400).json({ msg: "Error al eliminar el usuario" });
		}
	} catch (error) {
		logger.error("C: 🔴 Error al eliminar el usuario:", error);
		res.status(500).json({ msg: "Error interno del servidor" });
	}
};

const getAllUsersCondition = async (req, res) => {
	try {
		logger.info("C: 🔍 Buscando usuarios");
		const query = { password: 0, lastConnection: 0, __v: 0, _id: 0 };
		const users = await usersService.getAllCondition(query);
		if (users) {
			logger.info("C: ✅ Usuarios encontrados");
			res.status(200).json(users);
		} else {
			logger.error("C: 🔴 Error al buscar usuarios");
			res.status(400).json({ msg: "Error al buscar usuarios" });
		}
	} catch (error) {
		logger.error("C: 🔴 Error al buscar usuarios:", error);
		res.status(500).json({ msg: "Error interno del servidor" });
	}
};

const deleteAllUserTwoDays = async (req, res) => {
	try{
		const response = await usersService.deleInactiveUsers();
		if(response){
			logger.info("C: 🗑 Lo usuarios fueron eliminados")
		}else{
			logger.info("C: 🚯 No hay usuarios inactivos hace 2 dias")
		}

	}catch(error){
		logger.error("C: 🔴 Error al eliminar a los usuarios inactivos")
	}
};

export const controllerUsers = {
	getAllUsersCondition,
	postDocument,
	putUserRole,
	putUserProfile,
	deleteUser,
	deleteAllUserTwoDays,
};
