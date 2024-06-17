/* eslint-disable no-undef */
export const CARTS_TESTS = (http, expect, mock) => {
	describe("🛒 TEST CARTS", function () {
		const data = {};
		before(async () => {
			const user = await http
				.post("/api/sessions/login")
				.send(mock.user.usersuccess);
			const cookieJWT = user.headers["set-cookie"][0].split(";")[0].split("=");
			data.cookie = { name: cookieJWT[0], value: cookieJWT[1] };
			data.user = await mock.schema.Users.findOne({
				email: mock.user.usersuccess.email,
			});
			data.product = await mock.schema.Products.find({});
		});
		it("GET: /api/carts/:cid - CART", async function () {
			const res = await http
				.get(`/api/carts/${data.user.cart.cid}`)
				.set("Cookie", [`${data.cookie.name}=${data.cookie.value}`]);

			expect(res.status).to.equal(200);
		});
		it("POST: /api/carts/:cid/productos/:pid - POST PRODUCT TO CART", async function () {
			const res = await http
				.post(
					`/api/carts/${data.user.cart.cid}/productos/${data.product[0]._id}`
				)
				.set("Cookie", [`${data.cookie.name}=${data.cookie.value}`])
				.send({
					pid: data.product[0]._id,
					quantity: 1,
				});
			expect(res.body.message).to.equal("Producto agregado al carrito");
			expect(res.status).to.equal(200);
		});
		it("GET: /api/carts/:cid/productos/:pid - VIEW CART", async function () {
			const res = await http
				.get(
					`/api/carts/${data.user.cart.cid}/productos/${data.product[0]._id}`
				)
				.set("Cookie", [`${data.cookie.name}=${data.cookie.value}`]);

			expect(res.status).to.equal(200);
		});
		it("PUT: /api/carts/:cid/productos/:pid?action=add - UPDATE PRODUCT IN CART", async function () {
			const res = await http
				.put(
					`/api/carts/${data.user.cart.cid}/productos/${data.product[0]._id}?action=add`
				)
				.set("Cookie", [`${data.cookie.name}=${data.cookie.value}`]);

			expect(res.status).to.equal(200);
		});
		it("DELETE: /api/carts/:cid/productos/:pid - DELETE PRODUCT IN CART", async function () {
			const res = await http
				.delete(
					`/api/carts/${data.user.cart.cid}/productos/${data.product[0]._id}`
				)
				.set("Cookie", [`${data.cookie.name}=${data.cookie.value}`]);

			expect(res.status).to.equal(200);
		});
	});
};
