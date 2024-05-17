import bcrypt from "bcrypt";

const salt = bcrypt.genSaltSync(10);

export const hashPassword = password => {
	return bcrypt.hashSync(password, salt);
};

export const comparePassword = (user, password) => {
	console.log(user.password, password);
	return bcrypt.compareSync(password, user.password);
};
// 