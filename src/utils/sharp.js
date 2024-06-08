// import sharp from "sharp";
// export const resizeImageBuffer = async (file, width, height) => {
// 	try {
// 		const resizeBuffer = await sharp(file.buffer)
// 			.resize(width, height, {
// 				fit: "contain",
// 				background: { r: 255, g: 255, b: 255, alpha: 0.5 },
// 			})
// 			.webp()
// 			.toBuffer();
// 		return resizeBuffer;
// 	} catch (error) {
// 		console.error(error);
// 		return null;
// 	}
// };
import sharp from "sharp";
import { logger } from "./logger/logger.js";

export const resizeImageBuffer = async (file, width, height) => {
	try {
		const resizeBuffer = await sharp(file.buffer)
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
