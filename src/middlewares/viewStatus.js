export const viewMessageStatus = msg => {
	const status = [
		{ code: 200, message: "petición exitosa" },
		{ code: 201, message: "recurso creado" },
		{ code: 204, message: "sin contenido" },
		{ code: 400, message: "petición incorrecta" },
		{ code: 401, message: "no autorizado" },
		{ code: 403, message: "prohibido" },
		{ code: 404, message: "no encontrado" },
		{ code: 500, message: "error interno del servidor" },
	];

	return status.find(e => e.code === msg);
};
