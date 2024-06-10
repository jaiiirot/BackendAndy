import jwt from "jsonwebtoken";

const createToken = (data, time) => {
	const token = jwt.sign(data, process.env.SECRET_COOKIE, {
		expiresIn: `${time}min`,
	});
	const cookieOptions = {
		signed: true,
		httpOnly: true,
		maxAge: time * 60 * 1000,
	};
	return { token, cookieOptions };
};

const verifyToken = token => {
	const result = jwt.verify(token, process.env.SECRET_COOKIE);
	console.log(result);
	return result;
};

const decodeToken = token => {
	const result = jwt.decode(token);
	console.log(result);
	return result;
};

export const jwtService = {
	createToken,
	verifyToken,
	decodeToken,
};
