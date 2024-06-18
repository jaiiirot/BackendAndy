import fs from "fs";
import path from "path";
import { logger } from "../utils/logger/logger.js";
import __dirname from "../utils/utils.js";

const postFsImages = async (buffer, name) => {
	try {
		const fileName = name.split("/").pop();
		const dir = path.join(__dirname, `public/uploads/products`);
		const filePath = path.join(dir, fileName);
		await fs.promises.writeFile(filePath, buffer, err => {
			if (err) {
				logger.error("🔴 Error al escribir el archivo", err);
			}
		});
		logger.info("✅ Archivo guardado correctamente");
	} catch (error) {
		logger.error("🔴 Error al guardar el archivo", error);
	}
};

const deleteFsImages = async name => {
	try {
		const fileName = name.split("/").pop();
		const dir = path.join(__dirname, `public/uploads/products`);
		const filePath = path.join(dir, fileName);
		await fs.promises.unlink(filePath, err => {
			if (err) {
				logger.error("🔴 Error al eliminar el archivo", err);
			}
		});
		logger.info("✅ Archivo eliminado correctamente");
	} catch (error) {
		logger.error("🔴 Error al eliminar el archivo", error);
	}
};

const postFsDocuments = async (buffer, name) => {
	try {
		const dir = path.join(__dirname, `public/uploads/documents`);
		const filePath = path.join(dir, name);
		await fs.promises.writeFile(filePath, buffer, err => {
			if (err) {
				logger.error("🔴 Error al escribir el archivo", err);
			}
		});
		logger.info("✅ Archivo guardado correctamente");
		return filePath;
	} catch (error) {
		logger.error("🔴 Error al guardar el archivo", error);
	}
};

const deleteFsDocuments = async name => {
	try {
		const fileName = name.split("/").pop();
		const dir = path.join(__dirname, `public/uploads/documents`);
		const filePath = path.join(dir, fileName);
		await fs.promises.unlink(filePath, err => {
			if (err) {
				logger.error("🔴 Error al eliminar el archivo", err);
			}
		});
		logger.info("✅ Archivo eliminado correctamente");
	} catch (error) {
		logger.error("🔴 Error al eliminar el archivo", error);
	}
};

export const fsService = {
	postFsImages,
	postFsDocuments,
	deleteFsImages,
	deleteFsDocuments,
};
