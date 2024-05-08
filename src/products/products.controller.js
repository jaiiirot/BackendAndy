import sharp from "sharp";
import ProductsDAO from "./products.dao.js";
import { postCloudinary, deleteCloudinary } from "../service/cloudinary.js";
import fs from "fs";
import __dirname from "../utils/utils.js";

const postImages = async (req, res) => {
	try {
		const {
			title,
			description,
			code,
			price,
			stock,
			category,
			type,
			genre,
			promocion,
		} = req.body;
		const categorys = category?.split(",");
		const photos = await Promise.all(
			await req.files.map(async file => {
				const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
				const outputPath = `${__dirname}/public/image/optimize/${
					uniqueSuffix + ".webp"
				}`;
				await sharp(file.buffer).resize(270, 500).webp().toFile(outputPath);
				const URL = await postCloudinary(outputPath);
				fs.promises.unlink(outputPath);
				return URL;
			})
		);
		const product = {
			title,
			description: description.replace(/\n/g, "<br>"),
			code,
			price,
			stock,
			promocion,
			type,
			genre,
			category: categorys,
			photo: photos,
		};
		if (req.body) {
			await ProductsDAO.addProduct(product);
			res.status(200).redirect("/panel/productos");
		} else {
			res
				.status(400)
				.json({ error: "No se pudieron obtener los datos del formulario" });
		}
	} catch (error) {
		console.error("Error al obtener todos los productos:", error);
		res.status(500).send({ error: "Error interno del servidor" });
	}
};

const deleteImages = async (req, res) => {
	try {
		const IDS = req.body;
		if (!Array.isArray(IDS) || IDS.length === 0) {
			return res.status(400).send({ error: "IDs de productos no válidos" });
		}
		IDS.forEach(async id => {
			const photo = await ProductsDAO.getById(id);
			photo.photo.forEach(async photo => {
				const imagePath = `${__dirname}/public/image/products/${photo}`;
				await fs.promises.unlink(imagePath);
			});
		});
		await ProductsDAO.deleteProducts(IDS);
		res.status(200).redirect("/panel/productos");
	} catch (error) {
		console.error("Error al eliminar productos:", error);
		res.status(500).send({ error: "Error interno del servidor" });
	}
};

const deleteImagesProduct = async (req, res) => {
	try {
		if (!req.params.pid) {
			return res.status(400).send({ msg: `Id no válido: ${req.params.pid}` });
		}
		const photo = await ProductsDAO.getById(req.params.pid);
		photo.photo.forEach(async photo => {
			const response = await deleteCloudinary(photo);
			console.log(response);
		});
		await ProductsDAO.deleteProduct(req.params.pid);
		res.status(200).redirect("/panel/productos");
	} catch (error) {
		console.error("Error al eliminar producto:", error);
		res.status(500).send({ error: "Error interno del servidor" });
	}
};

const putImagesProduct = async (req, res) => {
	try {
		const product = await ProductsDAO.getById(req.params.pid);
		let photos = [];
		if (req.files.length > 0 && req.files.length < 5) {
			product.photo.forEach(async photo => {
				const response = await deleteCloudinary(photo);
				console.log(response);
			});
			photos = await Promise.all(
				req.files.map(async file => {
					const URL = await postCloudinary(file.path);
					fs.promises.unlink(file.path);
					return URL;
				})
			);
		} else {
			photos = product.photo;
		}
		const { title, description, code, price, stock, category } = req.body;
		const categorys = category.split(",");
		const newProduct = {
			title,
			description: description.replace(/\n/g, "<br>"),
			code,
			price,
			stock,
			category: categorys,
			photo: photos,
		};
		await ProductsDAO.updateProduct(req.params.pid, newProduct);
		res.status(200).redirect("/panel/productos");
	} catch (error) {
		console.error("Error al actualizar el producto:", error);
		res.status(500).json({ error: "Error interno del servidor" });
	}
};

export const controllersProducts = {
	postImages,
	deleteImages,
	deleteImagesProduct,
	putImagesProduct,
};
