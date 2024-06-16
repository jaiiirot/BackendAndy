import supertest from "supertest";
import { expect } from "chai";
import { Users } from "../feature/users/users.schema.js";
import Products from "../feature/products/products.schema.js";
import { mockuser } from "./mock/user.mock.js";
import { mockprod } from "./mock/prod.mock.js";
import { SESSIONS_TESTS } from "./sessions.test.js";
import { PRODUCTS_TESTS } from "./products.test.js";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/ecommerce");
const http = supertest("http://localhost:8080");

describe("TEST API", () => {
	before(async () => {
		await Users.deleteOne({ email: mockuser.userregister.email });
	});

	SESSIONS_TESTS(http, expect, mockuser);
	PRODUCTS_TESTS(http, expect, { prod: mockprod, user: mockuser });
	// CARTS_TESTS(http, expect, mockcart);
});
