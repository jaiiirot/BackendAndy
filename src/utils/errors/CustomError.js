export default class CustomError {
	static createError({ name, cause, message, code, status }) {
		const error = new Error(message, { cause });
		error.name = name;
		error.cause = cause;
		error.message = message;
		error.code = code;
		error.status = status;
		return error;
	}
}
