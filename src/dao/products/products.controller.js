import ProductsDAO from "./products.dao.js";
import { postCloudinary } from "../../utils/cloudinary.js";
import __dirname from "../../utils.js";
import fs from "fs";

const getProducts = async (req, res) => {
	const products = await ProductsDAO.getAll({}, { limit: 10, lean: true });
	console.log(products);
	res.status(200).send(products);
};

const postProducts = async (req, res) => {
	const { title, description, code, price, stock, category } = req.body;
	const categorys = category.split(",");
	console.log(req.files, req.body);
	const photos = [];
	await req.files.forEach(async (file, i) => {
		const URL = await postCloudinary(file.path);
		console.log(URL);
		photos.push(URL);
		fs.promises.unlink(file.path);
	});
	console.log(photos);
	const product = {
		title,
		description: description.replace(/\n/g, "<br>"),
		code,
		price,
		stock,
		type: "indumentaria",
		genre: "unisex",
		category: categorys,
		photo: photos,
	};
	if (req.body) {
		await ProductsDAO.addProduct(product);
		res.status(200).json({ msg: "Producto agregado" });
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
		res.status(200).send({ msg: "Productos eliminados" });
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
			const imagePath = `${__dirname}/public/image/products/${photo}`;
			await fs.promises.unlink(imagePath);
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
		if (req.files.length > 0) {
			product.photo.forEach(async photo => {
				const imagePath = `${__dirname}/public/image/products/${photo}`;
				await fs.promises.unlink(imagePath);
			});
			photos = req.files.map(file => {
				return file.filename;
			});
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
		res.status(200).send(newProduct);
	} catch (error) {
		console.error("Error al actualizar el producto:", error);
		res.status(500).send({ error: "Error interno del servidor" });
	}
};

export default {
	getProducts,
	postProducts,
	deleteProduct,
	deleteProducts,
	putProduct,
};
