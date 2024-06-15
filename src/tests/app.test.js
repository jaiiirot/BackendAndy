import supertest from "supertest";
import { expect } from "chai";
import { Users } from "../feature/users/users.schema.js";
import Products from "../feature/products/products.schema.js";
import { mockuser } from "./mock/user.mock.js";
import { mockprod } from "./mock/prod.mock.js";
import { SESSIONS_TESTS } from "./sessions.test.js";
import { PRODUCTS_TESTS } from "./products.test.js";

const http = supertest("http://localhost:8080");

describe("TEST API", () => {
	before(async () => {
		Users.deleteOne({ email: mockuser.userregister.email }).exec();
	});

	SESSIONS_TESTS(http, expect, mockuser);
	PRODUCTS_TESTS(http, expect, mockprod);
	// CARTS_TESTS(http, expect, mockcart);
});
