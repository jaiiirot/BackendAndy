import multer from "multer";
import path from "path";
import _dirname from "../utils/utils.js";
import fs from "fs";

const storageCloud = multer.memoryStorage();

export const uploadBuffer = multer({ storage: storageCloud });

export const handleFileUploadAndSave = (req, res, next) => {
	uploadBuffer.array("photo", 4)(req, res, async err => {
		if (err) {
			return res.status(400).json({ error: "Error uploading files" });
		}
		req.files.forEach(file => {
			const folderName = "products"; // O 'profiles', 'documents', etc. según el caso
			const dir = path.join(_dirname, `public/uploads/${folderName}`);
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, { recursive: true });
			}
			const filePath = path.join(dir, file.originalname);

			fs.writeFile(filePath, file.buffer, err => {
				if (err) {
					console.error("Error writing file:", err);
					return res.status(500).json({ error: "Error saving file locally" });
				}
			});
		});

		next();
	});
};
