import multer from "multer";
import sharp from "sharp";
import __dirname from "../utils.js";

const storage = multer.diskStorage({
	destination: `${__dirname}/public/image/products/`,
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + ".png");
	},
});

// SHARP -> redimencionar las imagenes
export const resize = async file => {
	console.log("image/products/" + file.filename);
	const a = await sharp("image/products/" + file.filename)
		.resize(275, 450)
		.toFile(`./optimize/${file.filename}`);
	// return "optimized/" + file.originalname;
	console.log(a);
};

export const upload = multer({ storage });
