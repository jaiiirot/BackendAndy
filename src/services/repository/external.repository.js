import { usersService } from "../../feature/users/repository/users.service.js";
export default class ExternalRepository {
	constructor(cloudinary, crypt, jwt, nodemailer, sharp, socket, upload) {
		this.cloudinary = cloudinary;
		this.crypt = crypt;
		this.jwt = jwt;
		this.nodemailer = nodemailer;
		this.sharp = sharp;
		this.socket = socket;
		this.upload = upload;
	}

	async postCloudinaryBuffer(buffer) {
		return await this.cloudinary.postCloudinaryBuffer(buffer);
	}

	async postCloudinary(urlFile) {
		return await this.cloudinary.postCloudinary(urlFile);
	}

	async deleteCloudinary(urlFile) {
		return await this.cloudinary.deleteCloudinary(urlFile);
	}

	async updateCloudinary(urlFile, newUrl) {
		return await this.cloudinary.updateCloudinary(urlFile, newUrl);
	}

	hashPassword(password) {
		return this.crypt.hashPassword(password);
	}

	comparePassword(inputPassword, dbPassword) {
		return this.crypt.comparePassword(inputPassword, dbPassword);
	}

	async sendMail(to, subject, text, html) {
		return await this.nodemailer.sendMail(to, subject, text, html);
	}

	async sendMailPurchase(to, subject, text, html) {
		return await this.nodemailer.sendMail(to, subject, text, html);
	}

	async resizeImageBuffer(file, width, height) {
		return await this.sharp.resizeImageBuffer(file, width, height);
	}

	initialSocket(socket, ENV) {
		return this.socket.initialSocket(socket, ENV);
	}

	async postToken(data, time) {
		await usersService.putLastConnection(data.id);
		return this.jwt.createToken(data, time);
	}

	getToken(token) {
		return this.jwt.verifyToken(token);
	}

	decodeToken(token) {
		return this.jwt.decodeToken(token);
	}

	async postResizeCloudBuffer(buffer, width, height) {
		const resizeImage = await this.resizeImageBuffer(buffer, 300, 300);
		const result = await this.postCloudinaryBuffer(resizeImage);
		return result.secure_url;
	}
}
