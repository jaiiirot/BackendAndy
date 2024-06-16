export const PRODUCTS_TESTS = (http, expect, mock) => {
	describe("🏪 TEST PRODUCTS", function () {
		const loginAndGetCookies = async () => {
			const user = await http.post("/api/sessions/login").send(mock.user.admin);
			const cookieJWT = user.headers["set-cookie"][0].split(";")[0].split("=");
			return { name: cookieJWT[0], value: cookieJWT[1] };
		};

		it("POST PRODUCT - URL", async function () {
			const cookies = await loginAndGetCookies();
			const res = await http
				.post("/api/products/")
				.set("Cookie", [`${cookies.name}=${cookies.value}`])
				.send(mock.prod.producturl);
			expect(res.status).to.equal(200);
			expect(res.body).to.have.property("msg");
			expect(res.body.msg).to.equal("Producto agregado correctamente");
		});
		it("POST PRODUCT - FILES", async function () {
			const cookies = await loginAndGetCookies();
			const res = await http
				.post("/api/products/")
				.set("Cookie", [`${cookies.name}=${cookies.value}`])
				.field("title", mock.prod.productfile.title)
				.field("description", mock.prod.productfile.description)
				.field("code", mock.prod.productfile.code)
				.field("price", mock.prod.productfile.price)
				.field("stock", mock.prod.productfile.stock)
				.field("type", mock.prod.productfile.type)
				.field("genre", mock.prod.productfile.genre)
				.field("category", mock.prod.productfile.category)
				.field("owner", mock.prod.productfile.owner)
				.attach("photo", mock.prod.productfile.files[0])
				.attach("photo", mock.prod.productfile.files[1])
				.attach("photo", mock.prod.productfile.files[2])
				.attach("photo", mock.prod.productfile.files[3]);
			expect(res.status).to.equal(200);
			expect(res.body).to.have.property("msg");
			expect(res.body.msg).to.equal("Producto agregado correctamente");
		});
		it("GET PRODUCT ID", async function () {
			const cookies = await loginAndGetCookies();
			const res = await http
				.get("/api/products/665fc9d832ee05a1ea4a8eb8")
				.set("Cookie", [`${cookies.name}=${cookies.value}`]);
			expect(res.status).to.equal(200);
			expect(res.body).to.have.property("payload");
			expect(res.body).to.have.property("msg");
			expect(res.body).to.have.property("status");
			expect(res.status).to.equal(200);
			expect(res.body.msg).to.equal("¡Producto obtenido correctamente!");
		});
		it("PUT PRODUCT ID", async function () {
			const cookies = await loginAndGetCookies();
			const res = await http
				.put("/api/products/665fc9d832ee05a1ea4a8eb8")
				.set("Cookie", [`${cookies.name}=${cookies.value}`])
				.send(mock.prod.putproduct);
			expect(res.status).to.equal(200);
		});
		// it("DELETE PRODUCT ID", async function () {
		// 	const cookies = await loginAndGetCookies();
		// 	const res = await http
		// 		.delete("/api/products/abcdefghij1234567890abcdefgh0")
		// 		.set("Cookie", [`${cookies.name}=${cookies.value}`]);
		// 	expect(res.status).to.equal(200);
		// });
	});
};
