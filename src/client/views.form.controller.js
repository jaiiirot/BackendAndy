const Login = (req, res) => {
	try {
		res.render("components/form/login", {
			layout: "form",
			login: {
				title: "Login || Andy",
			},
		});
	} catch (error) {
		console.error("Error al procesar la solicitud:", error);
	}
};
const Register = (req, res) => {
	try {
		res.render("components/form/register", {
			layout: "form",
			login: {
				title: "Registrarse",
			},
		});
	} catch (error) {
		console.error("Error al procesar la solicitud:", error);
	}
};
export const controllersViewforms = {
	Login,
	Register,
};
