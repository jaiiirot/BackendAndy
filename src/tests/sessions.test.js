export const SESSIONS_TESTS = (http, expect, mock) => {
	describe("🔐 TEST SESSIONS", function () {
		it("REGISTER", async function () {
			const res = await http
				.post("/api/sessions/register")
				.send(mock.userregister);

			expect(res.status).to.equal(200);
			expect(res.body).to.have.property("msg");
			expect(res.body.msg).to.equal("Usuario registrado correctamente");
		});

		it("LOGIN USER - FAILED", async function () {
			const res = await http.post("/api/sessions/login").send(mock.userfailed);

			expect(res.status).to.equal(400);
			expect(res.body).to.have.property("msg");
			expect(res.body.msg).to.equal("¡Datos incorrectos!");
		});

		it("LOGIN USER - SUCCESS", async function () {
			const res = await http.post("/api/sessions/login").send(mock.usersuccess);

			expect(res.status).to.equal(200);
			expect(res.body).to.have.property("msg");
			expect(res.body.msg).to.equal("Usuario logueado correctamente");
		});

		// it("LOGOUT USER - AUTH", async function () {
		// 	const res = await http.get("/api/sessions/logout");
		// 	console.log("status:", res.status);
		// 	expect(res.status).to.equal(404);
		// });
	});
};
