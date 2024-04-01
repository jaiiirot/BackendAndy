import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: "dcj0jbxcr",
	api_key: "798346187113546",
	api_secret: "aVZr91EnmRWjIgYSrswLTdYSIRo",
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
		// console.log(urlFile, pathUrl);
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
