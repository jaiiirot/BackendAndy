import multer from "multer";
import path from "path";
import __dirname from "../utils/utils.js";
import fs from "fs";

const storageCloud = multer.memoryStorage();

export const uploadBuffer = multer({ storage: storageCloud });

const ramdomName = () => {
	return Math.random().toString(36).substring(7).toLowerCase();
};

export const fsSaveImagesProductsBuffer = (req, res, next) => {
	uploadBuffer.array("photo", 4)(req, res, async err => {
		if (err) {
			return res
				.status(400)
				.json({ error: "Error al guardar los archivos uploads" });
		}
		req.uploadedFilePath = {
			photos: req.files.map(file => {
				const dir = path.join(__dirname, `public/uploads/products`);
				if (!fs.existsSync(dir)) {
					fs.mkdirSync(dir, { recursive: true });
				}
				const filePath = path.join(dir, `${ramdomName()}.jpg	`);

				fs.writeFile(filePath, file.buffer, err => {
					if (err) {
						console.error("Error: al escribir el archivo", err);
						return res
							.status(500)
							.json({ error: "Error al guardar el archivo" });
					}
				});
				return filePath;
			}),
		};
		next();
	});
};

export const fsSaveDocumentsBuffer = (req, res, next) => {
	uploadBuffer.single("document")(req, res, async err => {
		if (err) {
			return res.status(400).json({ error: "error al obtener el archivo" });
		}
		// console.log(req.file);
		const fileName = `${ramdomName()}.pdf`;
		const file = req.file;
		const dir = path.join(__dirname, `public/uploads/documents`);
		const filePath = path.join(dir, fileName);
		fs.writeFile(filePath, file.buffer, err => {
			if (err) {
				console.error("Error al escribir el archivo", err);
				return res.status(500).json({ error: "Error al guardar el archivo" });
			}
		});
		req.uploadedFilePath = { doc: filePath };
		next();
	});
};

export const fsSaveProfileImageBuffer = (req, res, next) => {
	uploadBuffer.single("profile")(req, res, async err => {
		if (err) {
			return res.status(400).json({ error: "Error al obtener el archivo" });
		}
		const fileName = `${ramdomName()}.jpg`;
		const file = req.file;
		const dir = path.join(__dirname, `public/uploads/profiles`);
		const filePath = path.join(dir, fileName);
		fs.writeFile(filePath, file.buffer, err => {
			if (err) {
				console.error("Error al escribir el archivo", err);
				return res.status(500).json({ error: "Error al guardar el archivo" });
			}
		});
		req.uploadedFilePath = { profile: filePath };
		next();
	});
};
