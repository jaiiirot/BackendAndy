import { faker } from "@faker-js/faker";
import { logger } from "../logger/logger.js";
import __dirname from "../utils.js";
import fs from "fs";
faker.location = "es";

export const generateListProducts = async () => {
	try {
		const limitProducts = 10;
		const products = [];

		for (let i = 0; i < limitProducts; i++) {
			const product = await generateProduct();
			products.push(product);
		}
		const productIds = products.map(product => product._id);
		const productListJSON = JSON.stringify(productIds);

		fs.writeFileSync(
			`${__dirname}/utils/mocks/productIdsMocking.json`,
			productListJSON
		);

		logger.info("🟢 Lista de productos generada correctamente");
		return products;
	} catch (error) {
		logger.error("🔴 Error al generar la lista de productos:", error);
		throw error;
	}
};

export const generateProduct = async () => {
	try {
		const product = {
			_id: faker.database.mongodbObjectId(),
			title: faker.commerce.productName(),
			description: faker.commerce.productDescription(),
			code: `#${faker.string.alphanumeric(6)}`,
			price: parseFloat(faker.commerce.price({ min: 10000, max: 6000000 })),
			status: faker.datatype.boolean({ probability: 0.9 }),
			promocion: faker.datatype.boolean({ probability: 0.7 }),
			stock: faker.number.int({ min: 1, max: 15 }),
			type: faker.helpers.arrayElement(["accesorio", "indumentaria"]),
			genre: "masculino",
			category: Array.from(
				{ length: faker.number.int({ min: 1, max: 6 }) },
				() => faker.commerce.department()
			),
			photo: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () =>
				faker.image.url()
			),
			owner: faker.database.mongodbObjectId(),
		};
		return product;
	} catch (error) {
		logger.error("🔴 Error al generar el producto:", error);
		throw error;
	}
};

export const generateUsers = async () => {
	try {
		const user = {
			_id: faker.database.mongodbObjectId(),
			username: faker.internet.userName(),
			photo_user: faker.image.avatar(),
			first_name: faker.person.firstName(),
			last_name: faker.person.lastName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
			age: faker.number.int({ min: 18, max: 99 }),
			cart: {
				cid: faker.database.mongodbObjectId(),
			},
			messages: {
				mid: faker.database.mongodbObjectId(),
			},
			role: faker.helpers.arrayElement(["CLIENT", "ADMIN"]),
		};
		return user;
	} catch (error) {
		logger.error("🔴 Error al generar el usuario:", error);
		throw error;
	}
};
