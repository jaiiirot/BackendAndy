import sharp from "sharp";
import { postCloudinaryBuffer } from "../utils/cloudinary.js";

export const postImages = async (file, width, height) => {
	const resizeImgBuffer = await sharp(file.buffer)
		.resize(width, height, {
			fit: "contain",
			background: { r: 255, g: 255, b: 255, alpha: 0.5 },
		})
		.webp()
		.toBuffer();
	const imageUrl = await postCloudinaryBuffer(resizeImgBuffer);
	console.log(imageUrl.secure_url);
	return imageUrl.secure_url;
};
