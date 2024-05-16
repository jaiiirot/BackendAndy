// export const notFound = (req, res, next) => {
// 	try {
// 		console.log("req.user", req.user);
// 		if (req.user.role === "ADMIN") {
// 			res.status(404).render("admin/404", { title: "404" });
// 		} else {
// 			res.status(404).render("404", { title: "404" });
// 		}
// 	} catch (e) {
// 		console.error("Error al procesar la solicitud:", e);
// 		res.status(500).send({ error: "Error interno del servidor" });
// 	}
// };
