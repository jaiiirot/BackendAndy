import { v2 as cloudinary } from "cloudinary";
import { ENV } from "../config/config.js";
import { logger } from "../utils/logger/logger.js";

const { CLOUD_NAME, API_KEY, API_SECRET } = ENV.CLOUDINARY;
cloudinary.config({
	cloud_name: CLOUD_NAME,
	api_key: API_KEY,
	api_secret: API_SECRET,
});

const postCloudinary = async urlFile => {
	try {
		const result = await cloudinary.uploader.upload(urlFile, {
			folder: "ecommerce",
		});
		// logger.info("🟢 Imagen subida a Cloudinary:", result); // Registra la imagen subida en Cloudinary
		return result.secure_url;
	} catch (error) {
		logger.error("🔴 Error al subir la imagen a Cloudinary:", error); // Registra el error al subir la imagen
		return { msg: "Error al subir la imagen a Cloudinary:", error };
	}
};

const postCloudinaryBuffer = async imageBuffer => {
	try {
		return await new Promise((resolve, reject) => {
			cloudinary.uploader
				.upload_stream({ folder: "ecommerce" }, (error, result) =>
					!result ? reject(error) : resolve(result)
				)
				.end(imageBuffer);
		});
	} catch (error) {
		return { msg: "Error al subir la imagen a Cloudinary:", error };
	}
};

const deleteCloudinary = async urlFile => {
	const pathUrl = urlFile.split("/").pop().split(".").shift();
	return await new Promise((resolve, reject) => {
		cloudinary.uploader.destroy(`ecommerce/${pathUrl}`, (error, result) => {
			if (error) {
				logger.error("🔴 Error al eliminar la imagen de Cloudinary:", error);
				reject(error);
			} else {
				// logger.info("🟢 Imagen eliminada de Cloudinary:", result);
				resolve({ msg: "🟢 Imagen eliminada", result });
			}
		});
	});
};

const updateCloudinary = async (urlFile, newUrl) => {
	try {
		const publicid = urlFile.split("/").pop().split(".").shift();
		await cloudinary.uploader.destroy(publicid);
		const result = await cloudinary.uploader.upload(newUrl, {
			folder: "ecommerce",
		});
		logger.info("🟢 Imagen actualizada en Cloudinary:", result);
		return result.secure_url;
	} catch (error) {
		logger.error("🔴 Error al actualizar la imagen en Cloudinary:", error);
		return { msg: "Error al actualizar la imagen en Cloudinary:", error };
	}
};

export const cloudinaryService = {
	postCloudinaryBuffer,
	deleteCloudinary,
	postCloudinary,
	updateCloudinary,
};
