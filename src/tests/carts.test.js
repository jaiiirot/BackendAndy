export const CARTS_TESTS = (http, expect, mock) => {
	describe("🛒 TEST CARTS", function () {
		it("Crear Carrito", async function () {
			const res = await http.post("/api/carts").send(mock.newCart);
			console.log("status: ", res.status);
			expect(res.status).to.equal(302);
		});

		// it("Obtener Carritos", async function () {
		// 	const res = await http.get("/api/carts");
		// 	console.log("status: ", res.status);
		// 	expect(res.status).to.equal(200);
		// });

		// it("Obtener Carrito", async function () {
		// 	const res = await http.get("/api/carts/60f7c5f6d2d0f8a8b8b1f5f2");
		// 	console.log("status: ", res.status);
		// 	expect(res.status).to.equal(200);
		// });

		// it("Actualizar Carrito", async function () {
		// 	const res = await http
		// 		.put("/api/carts/60f7c5f6d2d0f8a8b8b1f5f2")
		// 		.send(mock.newCart);
		// 	console.log("status: ", res.status);
		// 	expect(res.status).to.equal(200);
		// });

		// it("Eliminar Carrito", async function () {
		// 	const res = await http.delete("/api/carts/60f7c5f6d2d0f8a8b8b1f5f2");
		// 	console.log("status: ", res.status);
		// 	expect(res.status).to.equal(200);
		// });
	});
};
