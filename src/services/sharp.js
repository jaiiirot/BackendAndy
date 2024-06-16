import sharp from "sharp";
import { logger } from "../utils/logger/logger.js";

const resizeImageBuffer = async (file, width, height) => {
	try {
		const resizeBuffer = await sharp(file)
			.resize(width, height, {
				fit: "contain",
				background: { r: 255, g: 255, b: 255, alpha: 0.5 },
			})
			.webp()
			.toBuffer();
		// logger.info("🟢 Imagen redimensionada con éxito");
		return resizeBuffer;
	} catch (error) {
		logger.error(`🔴 Error al redimensionar la imagen: ${error.message}`, {
			stack: error.stack,
		});
		return null;
	}
};

export const sharpService = {
	resizeImageBuffer,
};
