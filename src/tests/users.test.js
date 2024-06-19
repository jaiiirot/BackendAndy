/* eslint-disable no-undef */
export const USERS_TESTS = (http, expect, mock) => {
	describe("🔒 TEST USERS", function () {
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
		});

		it("POST: /api/users/documents/:uid - USER POST DOCUMENT", async function () {
			const res = await http
				.post(`/api/users/documents/${data.user._id}`)
				.set("Cookie", [`${data.cookie.name}=${data.cookie.value}`])
				.attach("documents", mock.user.documents[0])
				.attach("documents", mock.user.documents[1])
				.attach("documents", mock.user.documents[2]);

			expect(res.status).to.equal(200);
			expect(res.body).to.have.property("msg");
			expect(res.body.msg).to.equal("Documento subido correctamente");
		});

		it("DELETE: /api/users/:uid - DELETE USER", async function () {
			const admin = await http
				.post("/api/sessions/login")
				.send(mock.user.admin);
			const cookieJWTAdmin = admin.headers["set-cookie"][0]
				.split(";")[0]
				.split("=");
			const res = await http
				.delete(`/api/users/${data.user._id}`)
				.set("Cookie", [`${cookieJWTAdmin[0]}=${cookieJWTAdmin[1]}`]);

			expect(res.status).to.equal(200);
			expect(res.body).to.have.property("msg");
			console.log(res.body.msg);
			expect(res.body.msg).to.equal("Usuario eliminado correctamente");
		});
	});
};
