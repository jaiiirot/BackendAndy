import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: "dcj0jbxcr",
	api_key: "798346187113546",
	api_secret: "aVZr91EnmRWjIgYSrswLTdYSIRo",
});

export const postCloudinary = async urlFile => {
	try {
		const extension = urlFile.split(".").pop();
		const validExtensions = ["png", "jpg", "jpeg"];
		if (!validExtensions.includes(extension)) {
			return { message: "La extencion no es valida" };
		}
		const result = await cloudinary.uploader.upload(urlFile, {
			folder: "ecommerce",
		});
		return result.secure_url;
	} catch (error) {
		console.error("Error al subir la imagen a Cloudinary:", error);
	}
};
