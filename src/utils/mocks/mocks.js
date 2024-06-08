import { faker } from "@faker-js/Faker";
import { logger } from "../logger/logger.js";

faker.location = "es";

export const generateListProducts = async () => {
	try {
		const limitProducts = 10;
		const products = [];

		for (let i = 0; i < limitProducts; i++) {
			products.push(await generateProduct());
		}
		logger.info("🟢 Lista de productos generada correctamente");
		return products;
	} catch (error) {
		logger.error("🔴 Error al generar la lista de productos:", error);
		throw error;
	}
};

export const generateProduct = async () => {
	try {
		return {
			_id: faker.database.mongodbObjectId(),
			title: faker.commerce.productName(),
			description: faker.commerce.productDescription(),
			code: `#${faker.string.alphanumeric(6)}`,
			price: parseFloat(faker.commerce.price()),
			status: faker.datatype.boolean({ probability: 0.9 }),
			promocion: faker.datatype.boolean(),
			stock: faker.number.int({ min: 1, max: 50 }),
			type: faker.helpers.arrayElement(["accesorio", "indumentaria"]),
			genre: "masculino",
			category: Array.from(
				{ length: faker.number.int({ min: 1, max: 6 }) },
				() => faker.commerce.department()
			),
			photo: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () =>
				faker.image.url()
			),
		};
	} catch (error) {
		logger.error("🔴 Error al generar el producto:", error);
		throw error;
	}
};

export const generateUsers = async () => {
	try {
		return {
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
	} catch (error) {
		logger.error("🔴 Error al generar el usuario:", error);
		throw error;
	}
};
