import ProductsDAO from "./products.dao.js";
import sharp from "sharp";
import { postCloudinary, deleteCloudinary } from "../../utils/cloudinary.js";
import __dirname from "../../utils.js";
import fs from "fs";

const getProducts = async (req, res) => {
	const products = await ProductsDAO.getAll({}, { limit: 10, lean: true });
	res.status(200).send(products);
};

const postProducts = async (req, res) => {
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
		req.files.map(async file => {
			const outputPath = `${__dirname}/public/image/optimize/${file.filename}`;
			const res = await sharp(file.path).resize(270, 450).toFile(outputPath);
			if (res) return await postCloudinary(outputPath);
		})
	);
	req.files.forEach(file => {
		const outputPath = `${__dirname}/public/image/optimize/${file.filename}`;
		fs.promises.unlink(outputPath);
	});
	req.files.forEach(async file => {
		await fs.promises.unlink(file.path);
	});
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
};

const deleteProducts = async (req, res) => {
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

const deleteProduct = async (req, res) => {
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

const putProduct = async (req, res) => {
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

export default {
	getProducts,
	postProducts,
	deleteProduct,
	deleteProducts,
	putProduct,
};
