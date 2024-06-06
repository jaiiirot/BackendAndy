import bcrypt from "bcrypt";

const salt = bcrypt.genSaltSync(10);

export const hashPassword = password => {
	return bcrypt.hashSync(password, salt);
};

export const comparePassword = (inputPassword, dbPassword) => {
	return bcrypt.compareSync(inputPassword, dbPassword);
};
//
