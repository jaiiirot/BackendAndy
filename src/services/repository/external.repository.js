import { usersService } from "../../feature/users/repository/users.service.js";
import { logger } from "../../utils/logger/logger.js";

export default class ExternalRepository {
	#PORT = 8080;
	#HOST = "";

	constructor(cloudinary, crypt, jwt, nodemailer, sharp, socket, upload) {
		this.cloudinary = cloudinary;
		this.crypt = crypt;
		this.jwt = jwt;
		this.nodemailer = nodemailer;
		this.sharp = sharp;
		this.socket = socket;
		this.upload = upload;

		// this.#HOST = window.location
	}

	async postCloudinaryBuffer(buffer) {
		try {
			return await this.cloudinary.postCloudinaryBuffer(buffer);
		} catch (error) {
			logger.error("SX: ⚠️ Error al subir buffer a Cloudinary:", error);
			throw error;
		}
	}

	async postCloudinary(urlFile) {
		try {
			return await this.cloudinary.postCloudinary(urlFile);
		} catch (error) {
			logger.error("SX: ⚠️ Error al subir archivo a Cloudinary:", error);
			throw error;
		}
	}

	async deleteCloudinary(urlFile) {
		try {
			return await this.cloudinary.deleteCloudinary(urlFile);
		} catch (error) {
			logger.error("SX: ⚠️ Error al eliminar archivo de Cloudinary:", error);
			throw error;
		}
	}

	async updateCloudinary(urlFile, newUrl) {
		try {
			return await this.cloudinary.updateCloudinary(urlFile, newUrl);
		} catch (error) {
			logger.error("SX: ⚠️ Error al actualizar archivo en Cloudinary:", error);
			throw error;
		}
	}

	hashPassword(password) {
		return this.crypt.hashPassword(password);
	}

	comparePassword(inputPassword, dbPassword) {
		return this.crypt.comparePassword(inputPassword, dbPassword);
	}

	async sendMail(to, subject, text, html) {
		try {
			return await this.nodemailer.sendMail(to, subject, text, html);
		} catch (error) {
			logger.error("SX: ⚠️ Error al enviar correo electrónico:", error);
			throw error;
		}
	}

	async sendMailPurchase(to, subject, text, html) {
		try {
			return await this.nodemailer.sendMail(to, subject, text, html);
		} catch (error) {
			logger.error("SX: ⚠️ Error al enviar correo de compra:", error);
			throw error;
		}
	}

	async sendMailPasswordConfirmed(to, subject, text, html) {
		try {
			return await this.nodemailer.sendMail(to, subject, text, html);
		} catch (error) {
			logger.error(
				"SX: ⚠️ Error al enviar correo de confirmación de contraseña:",
				error
			);
			throw error;
		}
	}

	async sendMailDeleteInactive(to, subject, text, html) {
		try {
			return await this.nodemailer.sendMail(to, subject, text, html);
		} catch (error) {
			logger.error(
				`SX:⚠️ Error al enviar correo de Elimiaccion de contraseña: `,
				error
			);
		}
	}

	async resizeImageBuffer(file, width, height) {
		try {
			return await this.sharp.resizeImageBuffer(file, width, height);
		} catch (error) {
			logger.error("SX: ⚠️ Error al redimensionar imagen en buffer:", error);
			throw error;
		}
	}

	initialSocket(socket, ENV) {
		return this.socket.initialSocket(socket, ENV);
	}

	async postToken(data, time) {
		try {
			await usersService.putLastConnection(data.id);
			return this.jwt.createToken(data, time);
		} catch (error) {
			logger.error("SX: ⚠️ Error al crear token:", error);
			throw error;
		}
	}

	getToken(token) {
		try {
			const result = this.jwt.verifyToken(token);
			logger.info(`SX: 🔑 Token verificado correctamente ${result}`);
			return result;
		} catch (error) {
			logger.warning("SX: ⚠️ Error al obtener token:", error);
			throw error;
		}
	}

	decodeToken(token) {
		return this.jwt.decodeToken(token);
	}

	async postResizeCloudBuffer(buffer, width, height) {
		try {
			const resizeImage = await this.resizeImageBuffer(buffer, width, height);
			const result = await this.postCloudinaryBuffer(resizeImage);
			return result.secure_url;
		} catch (error) {
			logger.error(
				"SX: ⚠️ Error al redimensionar y subir buffer a Cloudinary:",
				error
			);
			throw error;
		}
	}
}
