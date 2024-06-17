import supertest from "supertest";
import { expect } from "chai";
import { Users } from "../feature/users/users.schema.js";
import Products from "../feature/products/products.schema.js";
import { Carts } from "../feature/carts/carts.schema.js";
import { mockuser } from "./mock/user.mock.js";
import { mockprod } from "./mock/prod.mock.js";
import { SESSIONS_TESTS } from "./sessions.test.js";
import { PRODUCTS_TESTS } from "./products.test.js";
import { CARTS_TESTS } from "./carts.test.js";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/ecommerce");
const http = supertest("http://localhost:8080");

// eslint-disable-next-line no-undef
describe("TEST API", () => {
	// eslint-disable-next-line no-undef
	before(async () => {
		try {
			await Users.deleteOne({
				email: mockuser.userregister.email,
			}).then(() => {
				console.log("Usuario de test borrado correctamente");
			});
			await Products.deleteOne({
				code: mockprod.productfile.code,
			}).then(() => {
				console.log("Producto de test borrado correctamente");
			});
			await Products.deleteOne({
				code: mockprod.producturl.code,
			}).then(() => {
				console.log("Producto de test borrado correctamente");
			});
		} catch (error) {
			console.log("Error al borrar los registros de la base de datos");
		}
	});

	SESSIONS_TESTS(http, expect, mockuser);
	PRODUCTS_TESTS(http, expect, { prod: mockprod, user: mockuser });
	CARTS_TESTS(http, expect, {
		prod: mockprod,
		user: mockuser,
		schema: { Users, Products, Carts },
	});
});
