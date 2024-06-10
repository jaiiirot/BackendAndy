export const generateUserErrorInfo = user => {
	return `Una o más propiedades estaban incompletas o no eran válidas.
    Lista de propiedades requeridas:
    * email    : debe ser un String, se recibió ${
			typeof user.email === "string"
				? user.email
				: `tipo inválido ${typeof user.email}`
		}
    * contraseña : debe ser un String, se recibió ${
			typeof user.password === "string"
				? user.password
				: `tipo inválido ${typeof user.password}`
		}`;
};
