import productsDto from "./products.dto.js";
import ProductsDAO from "./products.dao.js";
import { postCloudinary, deleteCloudinary } from "../../utils/cloudinary.js";
import fs from "fs";
import __dirname from "../../utils/utils.js";

const postProduct = async (req, res) => {
	try {
		if (!req.body) res.status(400).redirect("/panel/productos?st=postfailed");

		const newProducto = await productsDto.postProduct(req.body, req.files);
		await ProductsDAO.addProduct(newProducto);
		res.status(200).redirect("/panel/productos?st=postsuccess");
	} catch (error) {
		console.error("Error al obtener todos los productos:", error);
		res.status(500).redirect("/panel/productos?st=failed");
	}
};

const deleteProduct = async (req, res) => {
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
		res.status(200).redirect("/panel/productos?st=deletesuccess");
	} catch (error) {
		console.error("Error al eliminar productos:", error);
		res.status(500).redirect("/panel/productos?st=deletefailed");
	}
};

const deleteProducts = async (req, res) => {
	try {
		if (!req.params.pid)
			return res.status(400).send({ msg: `Id no válido: ${req.params.pid}` });

		const photo = await ProductsDAO.getById(req.params.pid);
		photo.photo.forEach(async photo => {
			const response = await deleteCloudinary(photo);
			console.log(response);
		});
		await ProductsDAO.deleteProduct(req.params.pid);
		res.status(200).redirect("/panel/");
	} catch (error) {
		console.error("Error al eliminar producto:", error);
		res.status(500).redirect("/panel/productos?st=deletefailed");
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
		res.status(200).redirect("/panel/productos?st=updatesuccess");
	} catch (error) {
		console.error("Error al actualizar el producto:", error);
		res.status(500).redirect("/panel/productos?st=updatefailed");
	}
};

export const controllersProducts = {
	postProduct,
	deleteProduct,
	putProduct,
	deleteProducts,
};