export const PRODUCTS_TESTS = (http, expect, mock) => {
	describe("🏪 TEST PRODUCTS", function () {
		it("Crear Producto", async function () {
			const res = await http.post("/api/products").send(mock.newProduct);
			console.log("status: ", res.status);
			expect(res.status).to.equal(302);
		});

		// it("Obtener Productos", async function () {
		// 	const res = await http.get("/api/products");
		// 	console.log("status: ", res.status);
		// 	expect(res.status).to.equal(200);
		// });

		// it("Obtener Producto", async function () {
		// 	const res = await http.get("/api/products/60f7c5f6d2d0f8a8b8b1f5f2");
		// 	console.log("status: ", res.status);
		// 	expect(res.status).to.equal(200);
		// });

		// it("Actualizar Producto", async function () {
		// 	const res = await http
		// 		.put("/api/products/60f7c5f6d2d0f8a8b8b1f5f2")
		// 		.send(mock.newProduct);
		// 	console.log("status: ", res.status);
		// 	expect(res.status).to.equal(200);
		// });

		// it("Eliminar Producto", async function () {
		// 	const res = await http.delete("/api/products/60f7c5f6d2d0f8a8b8b1f5f2");
		// 	console.log("status: ", res.status);
		// 	expect(res.status).to.equal(200);
		// });
	});
};
