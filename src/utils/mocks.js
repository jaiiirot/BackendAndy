import { faker } from "@faker-js/Faker";

faker.location = "es";

export const generateListProducts = async () => {
	try {
		const limitProducts = 100;
		const products = [];

		for (let i = 0; i < limitProducts; i++) {
			products.push(await generateProduct());
		}

		return products;
	} catch (error) {
		console.error("Error al generar la lista de productos:", error);
		throw error;
	}
};

export const generateProduct = async () => {
	return {
		_id: faker.database.mongodbObjectId(),
		title: faker.commerce.productName(),
		description: faker.commerce.productDescription(),
		code: faker.string.alphanumeric(10),
		price: parseFloat(faker.commerce.price()),
		status: faker.datatype.boolean({ probability: 0.9 }),
		stock: faker.number.int({ max: 100 }),
		type: faker.string.alphanumeric(),
		genre: faker.string.alphanumeric(),
		category: [faker.string.alphanumeric()],
		photo: [faker.image.url()],
	};
};
