import multer from "multer";
// import sharp from "sharp";
// import __dirname from "../utils.js";

const storage = multer.memoryStorage();

// const storage = multer.diskStorage({
// 	destination: `${__dirname}/public/image/products/`,
// 	filename: (req, file, cb) => {
//
// 		cb(null, uniqueSuffix + ".webp");
// 	},
// });

// export const helperSharp = files => {
// 	files.forEach(file => {
// 		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
// 		const outputPath = `${__dirname}/public/image/optimize/little-${uniqueSuffix}.webp`;
// 		sharp(file.buffer).resize(270, 450).webp().toFile(outputPath);
// 	});
// };

export const upload = multer({ storage });
