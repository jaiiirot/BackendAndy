export const SESSIONS_TESTS = (http, expect, mock) => {
	// eslint-disable-next-line no-undef
	describe("🔐 TEST SESSIONS", function () {
		// eslint-disable-next-line no-undef
		it("POST: /api/sessions/register - REGISTER", async function () {
			const res = await http
				.post("/api/sessions/register")
				.send(mock.userregister);

			expect(res.status).to.equal(200);
			expect(res.body).to.have.property("msg");
			expect(res.body.msg).to.equal("Usuario registrado correctamente");
		});

		// eslint-disable-next-line no-undef
		it("POST: /api/sessions/login - LOGIN FAILED", async function () {
			const res = await http.post("/api/sessions/login").send(mock.userfailed);

			expect(res.status).to.equal(400);
			expect(res.body).to.have.property("msg");
			expect(res.body.msg).to.equal("¡Datos incorrectos!");
		});

		// eslint-disable-next-line no-undef
		it("POST: /api/sessions/login - LOGIN SUCCESS", async function () {
			const res = await http.post("/api/sessions/login").send(mock.usersuccess);

			expect(res.status).to.equal(200);
			expect(res.body).to.have.property("msg");
			expect(res.body.msg).to.equal("Usuario logueado correctamente");
		});

		// eslint-disable-next-line no-undef
		it("GET: /api/sessions/logout - LOGOUT", async function () {
			const res = await http.get("/api/sessions/logout");
			// console.log("status:", res.status);
			expect(res.status).to.equal(302);
		});
	});
};
