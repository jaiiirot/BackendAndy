import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app"; 
import Products from "../models/products";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Products API", () => {
	before(async () => {
		await Products.deleteMany({});
	});

	describe("POST /api/products", () => {
		it("should create a new product", async () => {
			const newProduct = {
				title: "Test Product",
				description: "This is a test product",
				code: "TEST123",
				price: 10,
				status: true,
				promocion: false,
				stock: 100,
				type: "Test Type",
				genre: "Test Genre",
				category: ["TestCategory"],
				photo: ["test-image-url"],
			};

			const res = await chai
				.request(app)
				.post("/api/products")
				.send(newProduct);

			expect(res).to.have.status(201);
			expect(res.body).to.be.an("object");
			expect(res.body).to.have.property("title", "Test Product");
		});
	});

	describe("GET /api/products/:id", () => {
		it("should get a product by ID", async () => {
			// Primero, crea un producto de prueba
			const newProduct = await Products.create({
				title: "Test Product 2",
				description: "This is another test product",
				code: "TEST456",
				price: 20,
				status: true,
				promocion: false,
				stock: 50,
				type: "Test Type 2",
				genre: "Test Genre 2",
				category: ["TestCategory2"],
				photo: ["test-image-url-2"],
			});

			const res = await chai
				.request(app)
				.get(`/api/products/${newProduct._id}`);

			expect(res).to.have.status(200);
			expect(res.body).to.be.an("object");
			expect(res.body).to.have.property("title", "Test Product 2");
		});
	});

	describe("PUT /api/products/:id", () => {
		it("should update a product", async () => {
			// Primero, crea un producto de prueba
			const newProduct = await Products.create({
				title: "Test Product 3",
				description: "This is a third test product",
				code: "TEST789",
				price: 30,
				status: true,
				promocion: false,
				stock: 75,
				type: "Test Type 3",
				genre: "Test Genre 3",
				category: ["TestCategory3"],
				photo: ["test-image-url-3"],
			});

			const updatedProduct = {
				title: "Updated Test Product",
				description: "This is the updated test product description",
				price: 25,
			};

			const res = await chai
				.request(app)
				.put(`/api/products/${newProduct._id}`)
				.send(updatedProduct);

			expect(res).to.have.status(200);
			expect(res.body).to.be.an("object");
			expect(res.body).to.have.property("title", "Updated Test Product");
		});
	});

	describe("DELETE /api/products/:id", () => {
		it("should delete a product", async () => {
			// Primero, crea un producto de prueba
			const newProduct = await Products.create({
				title: "Test Product 4",
				description: "This is a fourth test product",
				code: "TEST101",
				price: 40,
				status: true,
				promocion: false,
				stock: 90,
				type: "Test Type 4",
				genre: "Test Genre 4",
				category: ["TestCategory4"],
				photo: ["test-image-url-4"],
			});

			const res = await chai
				.request(app)
				.delete(`/api/products/${newProduct._id}`);

			expect(res).to.have.status(200);
			expect(res.body).to.be.an("object");
			expect(res.body).to.have.property(
				"message",
				"Product deleted successfully"
			);
		});
	});
});
