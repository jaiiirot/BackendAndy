import { expect } from "chai";
import supertest from "supertest";
import { mockuser } from "./mock/user.mock.js";
import mongoose from "mongoose";
import { SESSIONS_TESTS } from "./sessions.test.js";

const db = mongoose.connect("mongodb://localhost:27017/ecommerce");
const http = supertest("http://localhost:8080");

describe("TEST API", () => {
	before(async () => {
		console.log("Conectando a la base de datos");
	});

	SESSIONS_TESTS(http, expect, mockuser);
	PRODUCTS_TESTS(http, expect, mockprod);
	// CARTS_TESTS(http, expect, mockcart);
});
