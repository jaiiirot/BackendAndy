import { v2 as cloudinary } from "cloudinary";
import { ENV } from "./config.js";

const { CLOUD_NAME, API_KEY, API_SECRET } = ENV.CLOUDINARY;
cloudinary.config({
	cloud_name: CLOUD_NAME,
	api_key: API_KEY,
	api_secret: API_SECRET,
});

export const postCloudinary = async urlFile => {
	try {
		const result = await cloudinary.uploader.upload(urlFile, {
			folder: "ecommerce",
		});
		return result.secure_url;
	} catch (error) {
		return { msg: "Error al subir la imagen a Cloudinary:", error };
	}
};

export const deleteCloudinary = async urlFile => {
	try {
		const pathUrl = urlFile.split("/").pop().split(".").shift();
		const response = await cloudinary.uploader.destroy(`ecommerce/${pathUrl}`);
		return { msg: "Imagen eliminada", response };
	} catch (error) {
		return { msg: "Error al eliminar la imagen de Cloudinary:", error };
	}
};

export const updateCloudinary = async (urlFile, newUrl) => {
	try {
		const publicid = urlFile.split("/").pop().split(".").shift();
		await cloudinary.uploader.destroy(publicid);
		const result = await cloudinary.uploader.upload(newUrl, {
			folder: "ecommerce",
		});
		return result.secure_url;
	} catch (error) {
		return { msg: "Error al actualizar la imagen en Cloudinary:", error };
	}
};
