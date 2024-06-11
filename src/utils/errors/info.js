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

export const generateProductErrorInfo = product => {
	return `Una o más propiedades estaban incompletas o no eran válidas.
    Lista de propiedades requeridas:
    * title      : debe ser un String, se recibió ${
			typeof product.title === "string"
				? product.title
				: `tipo inválido ${typeof product.title}`
		}
    * description: debe ser un String, se recibió ${
			typeof product.description === "string"
				? product.description
				: `tipo inválido ${typeof product.description}`
		}
    * code       : debe ser un String, se recibió ${
			typeof product.code === "string"
				? product.code
				: `tipo inválido ${typeof product.code}`
		}
    * price      : debe ser un Number, se recibió ${
			typeof product.price === "number"
				? product.price
				: `tipo inválido ${typeof product.price}`
		}
    * status     : debe ser un Boolean, se recibió ${
			typeof product.status === "boolean"
				? product.status
				: `tipo inválido ${typeof product.status}`
		}
    * promocion  : debe ser un Boolean, se recibió ${
			typeof product.promocion === "boolean"
				? product.promocion
				: `tipo inválido ${typeof product.promocion}`
		}
    * stock      : debe ser un Number, se recibió ${
			typeof product.stock === "number"
				? product.stock
				: `tipo inválido ${typeof product.stock}`
		}
    * type       : debe ser un String, se recibió ${
			typeof product.type === "string"
				? product.type
				: `tipo inválido ${typeof product.type}`
		}
    * genre      : debe ser un String, se recibió ${
			typeof product.genre === "string"
				? product.genre
				: `tipo inválido ${typeof product.genre}`
		}
    * category   : debe ser un Array, se recibió ${
			Array.isArray(product.category)
				? product.category
				: `tipo inválido ${typeof product.category}`
		}
    * photo      : debe ser un Array de Strings con un máximo de 4 elementos, se recibió ${
			Array.isArray(product.photo) &&
			product.photo.every(item => typeof item === "string")
				? product.photo.length <= 4
					? product.photo
					: `demasiados elementos (${product.photo.length})`
				: `tipo inválido ${typeof product.photo}`
		}`;
};
